import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './action-types';
import { tap } from 'rxjs';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  tokenService = inject(TokenService);

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signin),
        tap((action) => {
          // localStorage.setItem('accessToken', action.auth.accessToken);
          // localStorage.setItem('refreshToken', action.auth.refreshToken);
          this.tokenService.setAccessToken(action.auth.accessToken);
          this.tokenService.setrefreshToken(action.auth.refreshToken);
          this.router.navigateByUrl('/books');})
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signout),
        tap((action) => {
          localStorage.removeItem('accessToken');
          this.router.navigateByUrl('/signin');
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) {}
}
