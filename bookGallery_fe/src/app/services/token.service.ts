import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  readonly accessToken = 'accessToken';

  setAccessToken(token: string): void {
    localStorage.setItem(this.accessToken, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessToken);
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.accessToken);
  }
  readonly refreshToken = 'refreshToken';

  setrefreshToken(token: string): void {
    localStorage.setItem(this.refreshToken, token);
  }

  getrefreshToken(): string | null {
    return localStorage.getItem(this.refreshToken);
  }

  removerefreshToken(): void {
    localStorage.removeItem(this.refreshToken);
  }
}
