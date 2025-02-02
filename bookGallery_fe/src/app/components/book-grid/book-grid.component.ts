import { PaginationStateService } from './../../services/pagination-state.service';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { BookSmall } from '../../models/book.small.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-grid',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './book-grid.component.html',
  styleUrl: './book-grid.component.scss',
})
export class BookGridComponent {
  currentPage: number = 1;
  pageSize: number = 0; // 3x3 grid
  totalBooks = 0;
  totalPages = 0;

// Method to calculate page size based on screen dimensions
calculatePageSize() {
  const blockWidth = 300;
  
  const screenWidth = window.innerWidth;

  const columns = Math.floor(screenWidth / blockWidth);

  this.pageSize = 3 * columns;

  console.log(`Calculated pageSize: ${this.pageSize}`);
}


  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    private paginationStateService: PaginationStateService
  ) {
    const state = this.paginationStateService.getBookGridState();
    this.currentPage = state.page;
    this.pageSize = state.pageSize;
    this.calculatePageSize()
  }
  ngOnInit(): void {
    this.fetchBooks();
    this.fetchCountOFBooks();
  }

  books: BookSmall[] | undefined;

  fetchBooks() {
    console.log('pageNumber ' + this.currentPage);

    this.bookService
      .getAllBooks(this.currentPage - 1, this.pageSize)
      .subscribe((data) => {
        this.books = data;
        console.log(this.books.length);
      });
  }
  fetchCountOFBooks() {
    this.bookService.getCountOfRecords().subscribe((data) => {
      this.totalBooks = data;
      this.totalPages = Math.ceil(this.totalBooks / this.pageSize);
      console.log(data);
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
