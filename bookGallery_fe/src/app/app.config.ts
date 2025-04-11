import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './error-handling/error.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { customInterceptor } from './intercepter/custom.interceptor';
import { provideStore } from '@ngrx/store';
import { authReducer, profileReducer } from './stores/Auth.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { bookReducer, booksReducer } from './stores/book.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([customInterceptor, errorInterceptor])),
    provideAnimations(), // required animations providers
    provideToastr(),
    provideStore(),
    provideStore({ auth: authReducer, profile: profileReducer, books: booksReducer, book: bookReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideAnimationsAsync(),
  ],
};
