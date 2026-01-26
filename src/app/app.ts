import { Component, inject } from '@angular/core';
import { JokesList } from './components/jokes-list/jokes-list';
import { Pagination } from './components/pagination/pagination';
import { JokeService } from './sevices/joke-service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExtractUsers } from './pipes/extract-users-pipe';

@Component({
  selector: 'app-root',
  imports: [JokesList, Pagination, AsyncPipe, ExtractUsers, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private jokeService = inject(JokeService);
  jokeResponse$ = this.jokeService.jokeResponse$;
  isLoading = this.jokeService.isLoading;
  searchTerm: string = '';

  handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.jokeService.setSearchTerm(input.value);
  }
}
