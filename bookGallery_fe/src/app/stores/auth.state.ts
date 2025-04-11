import { Author } from '../models/author.model';
import { BookSmall } from '../models/book.small.model';
import { Auth } from './auth.model';

export interface AppState {
  auth: Auth;
  profile: Author;
  books: BookSmall[];
  book: BookSmall;
}
