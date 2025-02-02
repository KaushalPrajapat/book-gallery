import { Routes } from '@angular/router';
import { BookGridComponent } from './components/book-grid/book-grid.component';
import { AuthorComponent } from './components/author-grid/author/author.component';
import { FullBookViewComponent } from './components/book-grid/full-book/full-book.component';
import { CreateReviewComponent } from './components/create-review/create-review.component';
import { AuthorGridComponent } from './components/author-grid/author-grid.component';
import { CreateBookComponent } from './components/book-grid/create-book/create-book.component';

export const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: BookGridComponent },
  { path: 'books/create-book', component: CreateBookComponent },
  { path: 'full-book/:id', component: FullBookViewComponent },
  { path: 'author/:authorId', component: AuthorComponent },
  { path: "authors", component: AuthorGridComponent },
  { path: 'write-review/:bookId', component: CreateReviewComponent },
  { path: '**', redirectTo: '' },
];
