export interface JokeResponse {
  current_page: number;
  limit: number;
  next_page: number;
  previous_page: number;
  results: Joke[];
  search_term: string;
  status: number;
  total_jokes: number;
  total_pages: number;
}

export interface Joke {
  id: string;
  joke: string;
}

export const emptyJokeResponse: JokeResponse = {
  current_page: 1,
  limit: 0,
  next_page: 0,
  previous_page: 0,
  results: [],
  search_term: '',
  status: 200,
  total_jokes: 0,
  total_pages: 0,
};
