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

  ngOnInit() {
    console.log('5' - -'2'); // 7
    console.log('5' + -'2'); // '5-2'
    console.log(true + false); // 1
    console.log(true - false); // 1
    console.log(null + 1); // 1
    console.log(null == 0); // false
    console.log(null >= 0); // true
    console.log(undefined + 1); // NaN
    console.log(undefined == null); // true
    console.log(NaN === NaN); // false
    console.log(0 == false); // true
    console.log('' == false); // true
    console.log([] == false); // true
    console.log([] == ![]); // true because first [] is converted to false, ![] is converted to boolean, since all arrays and objects are truthy, ![] becomes false, so the comparison is false == false
    console.log([0] == 0); // true
    console.log([1, 2] == '1,2'); // true
    console.log({} == '[object Object]'); // true
    console.log({} + []); // '[object Object]'
    console.log([] + []); // ''
    console.log([] + {}); // '[object Object]'
    console.log({} + {}); // '[object Object][object Object]'
    console.log({} + []); // '[object Object]'
    console.log([][[]] + []); // undefined, but STRING
    console.log([][[]]); // undefined
  }
}
