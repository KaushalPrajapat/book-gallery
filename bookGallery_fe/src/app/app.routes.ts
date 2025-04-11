import { Routes } from '@angular/router';
import { BookGridComponent } from './components/book-grid/book-grid.component';
import { AuthorComponent } from './components/author-grid/author/author.component';
import { FullBookViewComponent } from './components/book-grid/full-book/full-book.component';
import { CreateReviewComponent } from './components/create-review/create-review.component';
import { AuthorGridComponent } from './components/author-grid/author-grid.component';
import { CreateBookComponent } from './components/book-grid/create-book/create-book.component';
import { HomeComponent } from './components/home/home.component';
import { SigninDialogComponent } from './components/auth/signin-dialog/signin-dialog.component';
import { SignupDialogComponent } from './components/auth/signup-dialog/signup-dialog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { AllBooksComponent } from './components/book-grid/all-books/all-books.component';

export const routes: Routes = [
  { path: 'books', component: AllBooksComponent, canActivate: [authGuard] },
  {
    path: 'full-book/:id',
    component: FullBookViewComponent,
    canActivate: [authGuard],
  },
  { path: '', component: HomeComponent, canActivate: [] },
  { path: 'signin', component: SigninDialogComponent, canActivate: [] },
  { path: 'signup', component: SignupDialogComponent, canActivate: [] },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'author/:authorId',
    component: AuthorComponent,
    canActivate: [authGuard],
  },
  { path: 'authors', component: AuthorGridComponent, canActivate: [authGuard] },
  {
    path: 'books/create-book',
    component: CreateBookComponent,
    canActivate: [authGuard],
  },
  {
    path: 'write-review/:bookId',
    component: CreateReviewComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
