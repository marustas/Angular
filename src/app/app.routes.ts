import { Routes } from '@angular/router';
import { WeatherReportComponent } from './components/weather-report-component/weather-report-component';

export const routes: Routes = [
  {
    path: '',
    component: WeatherReportComponent,
  },
  {
    path: ':locationName',
    component: WeatherReportComponent,
  },
];
