import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service'

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  constructor(forcastServise: ForecastService) {
    forcastServise.getForecast()
      .subscribe((weatherForcast) => {
        console.log(weatherForcast)
      })
  }

  ngOnInit(): void {
  }

}
