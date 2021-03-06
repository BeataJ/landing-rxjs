import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {
  map,
  switchMap,
  pluck,
  mergeMap,
  filter,
  toArray,
  share,
  tap,
  catchError,
  retry
}
  from 'rxjs/operators';
import { environment } from 'environment';
import { NotificationsService } from '../notifications/notifications.service';


interface OpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number
    };
    weather: [{
      description: string,
      icon: string,
    }]
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast'

  constructor(private http: HttpClient, private notificationService: NotificationsService) { }

  getForecast() {
    return this.getCurrentLocation()
      .pipe(
        map(coords => {
          return new HttpParams()
            .set('lat', String(coords.latitude))
            .set('lon', String(coords.longitude))
            .set('units', 'metric')
            .set('appid', environment.apiWeatherKey)
        }),
        switchMap(params => this.http.get<OpenWeatherResponse>(this.url, { params })
          .pipe(
            tap(
              () => {
                this.notificationService.addSuccess('Got your weatherforcast')
              }
            )
          )
        ),
        catchError((err) => {
          // #1 - Handle the error
          this.notificationService.addError('Failed to get your weatherforcast');

          // #2 - Return a new observable
          return throwError(err)

        }),
        pluck('list'),
        mergeMap(value => of(...value)),
        filter((value, index) => index % 8 === 0),
        map(value => {
          return {
            dateString: value.dt_txt,
            temp: value.main.temp,
            description: value.weather[0].description,
            icon: value.weather[0].icon
          }
        }),
        toArray(),
        share()
      )
  }

  getCurrentLocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete()
        },
        (err) => observer.error(err)
      )
    }).pipe(
      retry(1),
      tap(
        () => {
          this.notificationService.addSuccess('Got your location')
        }
        // (err)=> this.notificationService.addError('Failed to get your location')
      ),
      catchError((err) => {
        // #1 - Handle the error
        this.notificationService.addError('Failed to get your location');

        // #2 - Return a new observable
        return throwError(err)

      })
    );
  }
}
