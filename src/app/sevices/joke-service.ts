import { inject, Injectable, signal } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
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
  private searchTermSubject = new BehaviorSubject<string>('');

  public jokes$ = combineLatest([
    this.pageSubject,
    this.searchTermSubject.pipe(debounceTime(300), distinctUntilChanged(), startWith('')),
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

  getJokes(pageToFetch?: number, searchTerm?: string): Observable<Joke[]> {
    this.isLoading.set(true);

    return this.httpClient
      .get<JokeResponse>(this.apiUrl, {
        headers: { Accept: 'application/json' },
        params: {
          page: pageToFetch ?? 1,
          ...(searchTerm ? { term: searchTerm } : {}),
        },
      })
      .pipe(
        map((response) => response.results),
        catchError((error) => {
          console.error('Error fetching jokes:', error);
          return of<Joke[]>([]);
        }),
        finalize(() => this.isLoading.set(false)),
      );
  }
}
