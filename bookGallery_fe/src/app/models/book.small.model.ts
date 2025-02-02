import { AuthorSmall } from './author.small.model';
import { BookReview } from './bookReview.model';

export interface BookSmall {
  bookId: number;
  bookTitle: string;
  bookDescription: string;
  author: AuthorSmall;
  reviews: BookReview[];
}
