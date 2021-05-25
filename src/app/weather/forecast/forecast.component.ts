import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ForecastService } from '../forecast.service'

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  forecast$: Observable<{ dateString: string; temp: number; description: string}[]>;

  constructor(forecastServise: ForecastService) {
    this.forecast$ = forecastServise.getForecast()
      
  }

  // forecastData = []
  //  constructor(forecastServise: ForecastService) {
  //  forecastServise.getForecast().subscribe(forecastData => {
//    this.forecastData = forecastdata;
  // }
      
  // }

  ngOnInit(): void {
  }

}
