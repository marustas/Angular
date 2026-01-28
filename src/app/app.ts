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
    console.log([] == ![]); // [] == false -> [] == 0 -> '' == 0 -> 0 == 0 -> true
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

//------------------------------------------------------------------
//1

(function () {
  console.log(1);
  setTimeout(function () {
    console.log(2);
  }, 1000);
  setTimeout(function () {
    console.log(3);
  }, 0);
  console.log(4);
})();

//------------------------------------------------------------------

//2

var myObject = {
  foo: 'bar',
  func: function () {
    var self = this;
    console.log(this.foo);
    console.log(self.foo);
    (function () {
      console.log(this.foo);
      console.log(self.foo);
    })();
  },
};
myObject.func();

//---------------------------------------------------------
//3

for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}
//-----------------------------------------------------------
//4

function doSomething() {
  x = 33;
  console.log(x);
  var x;
}
doSomething();

//---------------------------------------------------------
//5

var x = 2;
var y = '2';
console.log(x == y);

console.log(x === y);

//---------------------------------------------------------
//6

var obj = { name: 'Name', surname: 'Surname' };

var obj2 = obj;
obj.name = 'new value';
console.log(obj2.name);
obj = null;
console.log(obj2.name);

//---------------------------------------------------------
//7
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => {
  console.log('3');

  queueMicrotask(() => console.log('4'));

  Promise.resolve().then(() => console.log('5'));

  setTimeout(() => console.log('6'), 0);
});

(async () => {
  console.log('7');

  await null;

  console.log('8');

  await Promise.resolve().then(() => console.log('9'));

  console.log('10');
})();

queueMicrotask(() => {
  console.log('11');

  Promise.resolve().then(() => console.log('12'));
});

console.log('13');

// Output 1 -> 7 -> 13 -> 3 -> 8 -> 11 -> 4 -> 5 -> 9 -> 12 -> 10 -> 2 ->6
