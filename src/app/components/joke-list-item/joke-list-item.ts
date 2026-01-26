import { Component, input } from '@angular/core';
import { Joke } from '../../types/types';

@Component({
  selector: 'app-joke-list-item',
  imports: [],
  templateUrl: './joke-list-item.html',
  styleUrl: './joke-list-item.scss',
})
export class JokeListItem {
  joke = input.required<Joke>();
}
