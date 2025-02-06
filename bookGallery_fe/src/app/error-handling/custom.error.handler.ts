import { inject, Injectable } from '@angular/core';
import {  HttpErrorResponse } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { CustomError } from '../models/custom.error';
import { ToastService } from '../services/toast.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandler {

  private toastr = inject(ToastService);
constructor(private toastService: ToastService){}

  static handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      const customError: CustomError = error.error;
      errorMessage = customError.message || 'Server error';
      console.error(`Backend returned code ${customError.statusCode}, body was: ${customError.message}`);
    }
    // You can handle the error here (e.g., show a toast notification)
    return throwError(() => new Error(errorMessage));
  }
}
