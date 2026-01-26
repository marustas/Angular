import { Component, input } from '@angular/core';
import { JokeListItem } from '../joke-list-item/joke-list-item';
import { Joke } from '../../types/types';

@Component({
  selector: 'app-jokes-list',
  imports: [JokeListItem],
  templateUrl: './jokes-list.html',
  styleUrl: './jokes-list.scss',
})
export class JokesList {
  jokes = input.required<Joke[]>();
}
