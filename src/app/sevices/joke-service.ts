import { inject, Injectable, signal } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
} from 'rxjs';
import { Joke, JokeResponse } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { API_URL } from './apiUrl';

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  private httpClient = inject(HttpClient);
  private apiUrl = inject(API_URL);

  private pageSubject = new BehaviorSubject<number>(1);

  public jokes$ = this.pageSubject.pipe(
    switchMap((page) => this.getJokes(page)),
    shareReplay(1),
  );
  public isLoading = signal(false);
  public readonly pageCount = toSignal(this.pageSubject, { initialValue: 1 });

  setPage(page: number) {
    this.pageSubject.next(page);
  }

  getJokes(pageToFetch?: number): Observable<Joke[]> {
    this.isLoading.set(true);

    return this.httpClient
      .get<JokeResponse>(this.apiUrl, {
        headers: { Accept: 'application/json' },
        params: {
          page: pageToFetch ?? 1,
        },
      })
      .pipe(
        map((response) => response.results),
        catchError((error) => {
          console.error('Error fetching jokes:', error);
          return of([]);
        }),
        finalize(() => this.isLoading.set(false)),
      );
  }
}
