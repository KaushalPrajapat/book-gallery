
import { createSelector } from '@ngrx/store';
import { AppState } from './auth.state';
import { Author } from '../models/author.model';
import { Auth } from './auth.model';
import { BookSmall } from '../models/book.small.model';

export const authSelector = (state: AppState) => state.auth;
export const profileSelector = (state: AppState) => state.profile;
export const booksSelector = (state: AppState) => state.books;
export const bookSelector = (state: AppState) => state;

export const profileValue = createSelector(profileSelector, (state: Author) => {
  if (state.id === 0) {
    const profile = localStorage.getItem('profile');
    return profile ? (JSON.parse(profile) as Author) : null;
  }
  return state;
});

export const accessTokenValue = createSelector(
  authSelector,
  (state: Auth) => state.accessToken
);

export const booksValue = createSelector(
  booksSelector,
  (state: BookSmall[] | undefined) => {
    console.log('Books state:', state); // Debugging
    return state || []; // Fallback to an empty array if undefined
  }
);


export const bookValue = createSelector(
  bookSelector,
  (state: any) => state.book
);
