import { createAction, props } from '@ngrx/store';
import { BookSmall } from '../models/book.small.model';


export const fetchBooks = createAction(
  '[AllBook Component] fetchAll Books 09042025',
  props<{ books: BookSmall[] }>()
);


export const fetchBook = createAction(
  '[FullBook Component] fetchBook',
  props<{ book: BookSmall }>()
);


export const fetchCountOFBooks = createAction(
  '[AllBook Component] fetchCountOFBooks',
  props<{  totalBooks: number}>()
);

export const fetchCountOFPages = createAction(
  '[AllBook Component] fetchCountOFPages',
  props<{ totalPages: number }>()
);
