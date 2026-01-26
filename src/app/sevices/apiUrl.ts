import { InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken('API_URL', {
  providedIn: 'root',
  factory: () => 'https://icanhazdadjoke.com/search',
});
