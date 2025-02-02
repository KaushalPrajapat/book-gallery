import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../models/author.model';
import { baseUrl } from '../info/VARIABLES';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private apiUrl = baseUrl; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getAuthorByUserId(authorId: string): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/author/${authorId}`);
  }
  getAuthors(pageSize: number, page: number): Observable<Author[]> {
    console.log(pageSize, page);
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());

    return this.http.get<Author[]>(`${this.apiUrl}/author`, { params });
  }

  getCountOfRecords(): Observable<number> {
    return this.http.get<number>(`${baseUrl}/author/count`);
  }
}
