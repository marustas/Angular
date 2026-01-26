import { Component, inject } from '@angular/core';
import { JokesList } from './components/jokes-list/jokes-list';
import { Pagination } from './components/pagination/pagination';
import { JokeService } from './sevices/joke-service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [JokesList, Pagination, AsyncPipe, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private jokeService = inject(JokeService);
  jokes$ = this.jokeService.jokes$;
  isLoading = this.jokeService.isLoading;
  searchTerm: string = '';

  handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.jokeService.setSearchTerm(input.value);
  }
}
