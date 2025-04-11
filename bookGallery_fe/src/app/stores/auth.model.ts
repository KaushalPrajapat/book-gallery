import { AuthorSmall } from "../models/author.small.model";
import { BookReview } from "../models/bookReview.model";


export class Auth {
  accessToken: string = '';
  refreshToken: string = '';
  constructor(a: string, r: string) {
    this.accessToken = a;
    this.refreshToken = r;
  }
}



export class Book {
  bookId: number = 0;
  bookTitle: string = '';
  bookDescription: string = '';
  author: AuthorSmall = { id: 0, name: '' };
  reviews: BookReview[] = [];
}
