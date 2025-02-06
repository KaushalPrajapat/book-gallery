import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Author } from '../models/author.model';
import { Auth } from '../stores/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getUsername(): Observable<string> {
    throw new Error('Method not implemented.');
  }
  isAuthenticated$: Observable<any>;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.isAuthenticated$ = of(tokenService.getAccessToken() != null);
  }
  authUrl = 'http://localhost:9090/api/basic/auth/';
  profileUrl = 'http://localhost:9090/api/basic/author/profile';
  signup(value: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  getAuthorProfile(): Observable<Author> {
    const s = this.http.get<Author>(this.profileUrl);
    console.log(s);
    return s;
  }
  signOut(): Observable<any> {
    console.log('SignOut');
    this.tokenService.removeAccessToken();
    return of({ signout: true });
  }
  signin(signinForm: any): Observable<Auth> {
    const s = this.http.post<Auth>(this.authUrl + 'signin', {
      username: signinForm['username'],
      password: signinForm['password'],
    });
    return s;
  }
}
