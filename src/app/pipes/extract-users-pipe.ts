import { Pipe, PipeTransform } from '@angular/core';
import { Joke, JokeResponse } from '../types/types';

@Pipe({
  name: 'extractUsers',
})
export class ExtractUsers implements PipeTransform {
  transform(rawResponse: JokeResponse | null): Joke[] {
    return rawResponse?.results || [];
  }
}
