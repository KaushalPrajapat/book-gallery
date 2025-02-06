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

export const routes: Routes = [
  { path: 'books', component: BookGridComponent },
  { path: 'full-book/:id', component: FullBookViewComponent },
  { path: 'author/:authorId', component: AuthorComponent },
  { path: 'authors', component: AuthorGridComponent },
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninDialogComponent },
  { path: 'signup', component: SignupDialogComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
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
