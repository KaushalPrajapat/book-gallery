import { createReducer, on } from '@ngrx/store';
import { BookSmall } from '../models/book.small.model';
import { Auth } from './auth.model';
import { fetchBook, fetchBooks, fetchCountOFBooks, fetchCountOFPages } from './book.actions';

export const initialStateAuth: Auth = {
  accessToken: '',
  refreshToken: '',
};


const initialStateBooks: BookSmall[] = [];
export const initialStateBook: BookSmall = {
  bookId: 0,
  bookTitle: '',
  bookDescription: '',
  author: { id: 0, name: '' },
  reviews: [],
};
// export const booksReducer = createReducer(
//   initialStateBooks,
//   on(fetchBooks, (state, action) => {
//     return {
//       ...state,
//       books: action.books,
//     };
//   }),
// );
export const booksReducer = createReducer(
  initialStateBooks,
  on(fetchBooks, (state, { books }) => [...books]) // Update state with fetched books
);

export const bookReducer = createReducer(
  initialStateBook,
  on(fetchBook, (state, action) => {
    return {
      ...state,
      bookId: action.book.bookId,
      bookTitle: action.book.bookTitle,
      bookDescription: action.book.bookDescription,
      author: action.book.author,
      reviews: action.book.reviews,
    };
  })
);
