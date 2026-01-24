import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather-service';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable, switchMap } from 'rxjs';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';

import { AsyncPipe, DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-weather-report-component',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatCardSubtitle,
    TitleCasePipe,
    DatePipe,
    DecimalPipe,
    AsyncPipe,
  ],
  templateUrl: './weather-report-component.html',
  styleUrl: './weather-report-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherReportComponent implements OnInit {
  weatherData$: Observable<any> = new Observable<any>();
  protected readonly today: Date = new Date();

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.weatherData$ = this.route.params.pipe(
      map((params) => params['locationName']),
      filter((location) => !!location),
      switchMap((location) => this.weatherService.getWeatherForCity(location)),
    );
  }
}
