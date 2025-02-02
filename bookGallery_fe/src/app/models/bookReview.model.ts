import { AuthorSmall } from './author.small.model';
import { BookSmall } from './book.small.model';

export interface BookReview {
  bookReviewId: number;
  bookReviewTitle: string;
  bookReview: string;
  bookReviewRating: number;
  author: AuthorSmall;
  book : BookSmall;
}
