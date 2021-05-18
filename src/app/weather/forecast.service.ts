import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) { }

  getForecast() {
    return this.getCurrentLocation()
      .pipe(
        map(coords => {
          return new HttpParams()
            .set('lat', String(coords.latitude))
            .set('lon', String(coords.longitude))
            .set('units', 'metric')
            .set('appid', environment.apiKey)
        }),
        switchMap(params => {})
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
    });
  }
}
