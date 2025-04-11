import { Component, OnInit } from '@angular/core';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { BookSmall } from '../../../models/book.small.model';
import { BookService } from '../../../services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { PaginationStateService } from '../../../services/pagination-state.service';
import { BookGridComponent } from '../book-grid.component';
import {
  fetchBooks,
  fetchCountOFBooks,
  fetchCountOFPages,
} from '../../../stores/book.actions';

import { AppState } from '../../../stores/auth.state';
import { Store } from '@ngrx/store';
import { booksValue } from '../../../stores/all.selector';

@Component({
  selector: 'app-all-books',
  imports: [BookGridComponent],
  templateUrl: './all-books.component.html',
  styles: '',
})
export class AllBooksComponent implements OnInit {
  currentPage: number = 1;
  pageSize: number = 0; // 3x3 grid
  totalBooks = 0;
  totalPages = 0;
  books: BookSmall[] = [];

  // Method to calculate page size based on screen dimensions
  calculatePageSize() {
    const blockWidth = 300;
    const screenWidth = window.innerWidth;
    const columns = Math.floor(screenWidth / blockWidth);
    this.pageSize = 3 * columns;
    //console.log(`Calculated pageSize: ${this.pageSize}`);
  }

  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    private paginationStateService: PaginationStateService,
    private store: Store<AppState>
  ) {
    const state = this.paginationStateService.getBookGridState();
    this.currentPage = state.page;
    this.pageSize = state.pageSize;
    this.calculatePageSize();
  }

  ngOnInit(): void {
    this.store.select(booksValue).subscribe((state: BookSmall[]) => {
      this.books = state || []; // Fallback to an empty array
      console.log('Books from store:', this.books);

      if (this.books.length === 0) {
        this.fetchBooks();
      }
      this.fetchCountOFBooks();
    });
  }

  fetchBooks() {
    this.bookService
      .getAllBooks(this.currentPage - 1, this.pageSize)
      .subscribe((data) => {
        this.fetchCountOFBooks();
        this.books = data;
        this.store.dispatch(
          fetchBooks({
            books: this.books,
          })
        );
      });
  }
  fetchCountOFBooks() {
    this.bookService.getCountOfRecords().subscribe((data) => {
      this.totalBooks = data;
      this.totalPages = Math.ceil(this.totalBooks / this.pageSize);
      this.store.dispatch(
        fetchCountOFBooks({
          totalBooks: this.totalBooks,
        })
      );
      this.store.dispatch(
        fetchCountOFPages({
          totalPages: this.totalPages,
        })
      );
    });
  }

  openReviewDialog(book: BookSmall): void {
    this.dialog.open(ReviewDialogComponent, {
      width: '500px',
      data: { book: book },
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.paginationStateService.setBookGridState(
      this.currentPage,
      this.pageSize
    );
    this.fetchBooks();
  }
  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1; // Reset to first page when changing page size
    this.paginationStateService.setBookGridState(
      this.currentPage,
      this.pageSize
    );
    this.fetchBooks();
  }
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
