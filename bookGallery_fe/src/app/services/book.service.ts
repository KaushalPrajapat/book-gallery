import { baseUrl } from './../info/VARIABLES';
import { BookSmall } from './../models/book.small.model';
import {  Injectable } from '@angular/core';
import { HttpClient,  HttpParams } from '@angular/common/http';
import { catchError, Observable,  } from 'rxjs';
import { BookReview } from '../models/bookReview.model';
import { Author, AuthorTemp } from '../models/author.model';
import { SuccessMessage } from '../models/success.message.model';
import { CustomErrorHandler } from '../error-handling/custom.error.handler';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  createBook(bookData: any): Observable<SuccessMessage> {
    const res = this.http.post<SuccessMessage>(
      `${baseUrl}/book`,
      bookData
    );
    return res;
  }
  addBookReview(reviewData: any): Observable<SuccessMessage> {
    const res = this.http.post<SuccessMessage>(
      `${baseUrl}/book-review`,
      reviewData
    );
    return res;
  }

  getAuthorSReviews(userId: number): Observable<BookReview[]> {
    return this.http.get<BookReview[]>(`${baseUrl}/author/review/${userId}`);
  }
  constructor(private http: HttpClient) {}

  getCountOfRecords(): Observable<number> {
    return this.http.get<number>(`${baseUrl}/book/count`);
  }
  getBookAuthor(bookId: number): Observable<AuthorTemp> {
    return this.http.get<AuthorTemp>(`${baseUrl}/book/author/${bookId}`);
  }

  getAllBooks(page: number, size: number): Observable<BookSmall[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
console.log(params);

    return this.http.get<BookSmall[]>(`${baseUrl}/books?${params}`);
  }
  getBookReviews(bookId: number): Observable<BookReview[]> {
    return this.http.get<BookReview[]>(`${baseUrl}/book/reviews/${bookId}`);
  }
  getBookDetails(bookId: number): Observable<BookSmall> {
    debugger
    var a = this.http.get<BookSmall>(`${baseUrl}/book/${bookId}`);
    return a
  }

  getBook(id: number): Observable<any> {
    debugger
    return this.http.get(`${baseUrl}/book/${id}`).pipe(
      catchError(CustomErrorHandler.handleError)
    )
  }
}
