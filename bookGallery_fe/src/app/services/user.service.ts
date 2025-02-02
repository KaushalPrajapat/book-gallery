import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SuccessMessage } from '../models/success.message.model';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../info/VARIABLES';
import { UserSmall } from '../models/user.small.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  createUser(userForm: any): Observable<UserSmall> {
    return this.http.post<UserSmall>(`${baseUrl}/author`,userForm );
  }
  validateUser(userId: string): Observable<UserSmall> {
    return this.http.get<UserSmall>(`${baseUrl}/user/${userId}`);
  }

  constructor() {}
}
