import { BookSmall } from "./book.small.model";
import { BookReview } from "./bookReview.model";


export interface Author {
  id: number;
  userId: string;
  name: string;
  gender: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  jobTitle: string;
  books: BookSmall[];
  reviews: BookReview[];
}


export interface AuthorTemp {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  jobTitle: string;
}
