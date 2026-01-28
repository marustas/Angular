import { inject, Injectable, signal } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  finalize,
  Observable,
  of,
  shareReplay,
  switchMap,
} from 'rxjs';
import { emptyJokeResponse, JokeResponse } from '../types/types';
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
  private searchTermSubject = new BehaviorSubject<string>('');

  public jokeResponse$ = combineLatest([
    this.pageSubject,
    this.searchTermSubject.pipe(debounceTime(300), distinctUntilChanged()),
  ]).pipe(
    switchMap(([page, searchTerm]) => this.getJokes(page, searchTerm)),
    shareReplay(1),
  );

  public isLoading = signal(false);
  public readonly pageCount = toSignal(this.pageSubject, { initialValue: 1 });

  setPage(page: number) {
    this.pageSubject.next(page);
  }

  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  getJokes(pageToFetch?: number, searchTerm?: string): Observable<JokeResponse> {
    this.isLoading.set(true);

    return this.httpClient
      .get<JokeResponse>(this.apiUrl, {
        params: {
          page: pageToFetch ?? 1,
          ...(searchTerm ? { term: searchTerm } : {}),
        },
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching jokes:', error);
          return of<JokeResponse>(emptyJokeResponse);
        }),
        finalize(() => this.isLoading.set(false)),
      );
  }
}
