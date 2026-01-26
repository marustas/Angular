import { Component, inject } from '@angular/core';
import { JokeService } from '../../sevices/joke-service';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  private jokeService = inject(JokeService);

  readonly pageCount = this.jokeService.pageCount;

  increment() {
    this.jokeService.setPage(this.pageCount() + 1);
  }

  decrement() {
    this.jokeService.setPage(Math.max(this.pageCount() - 1, 1));
  }
}
