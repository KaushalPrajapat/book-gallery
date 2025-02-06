import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  console.log('In inteceptor');
  const acccessToken = tokenService.getAccessToken();
  if (acccessToken) {
    const cloneReq = req.clone({
      setHeaders:{
        Authorization:`Bearer ${acccessToken}`
      }
    });
    return next(cloneReq)
  }
  return next(req);
};
