import { PaginationStateService } from './../../services/pagination-state.service';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { BookSmall } from '../../models/book.small.model';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator'
import { SingleBookComponent } from './single-book/single-book.component';
@Component({
  selector: 'app-book-grid',
  standalone: true,
  imports: [RouterLink, CommonModule, MatPaginatorModule, SingleBookComponent],
  templateUrl: './book-grid.component.html',
  styleUrl: './book-grid.component.scss',
})
export class BookGridComponent {
  @Input() books: BookSmall[] | undefined;
  @Input() currentPage: number = 1;
  @Input() totalBooks = 0;
  @Input() totalPages = 0;
  pageSize: number = 0; // 3x3 grid
  @Output() pageChange = new EventEmitter<number>();

  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    private paginationStateService: PaginationStateService
  ) {
    const state = this.paginationStateService.getBookGridState();
    this.currentPage = state.page;
    this.pageSize = state.pageSize;
    this.calculatePageSize();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.paginationStateService.setBookGridState(
      this.currentPage,
      this.pageSize
    );
    this.pageChange.emit(this.currentPage);
  }
  calculatePageSize() {
    const blockWidth = 300;
    const screenWidth = window.innerWidth;
    const columns = Math.floor(screenWidth / blockWidth);
    this.pageSize = 3 * columns;
    //console.log(`Calculated pageSize: ${this.pageSize}`);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  openReviewDialog(book: BookSmall): void {
    this.dialog.open(ReviewDialogComponent, {
      width: '500px',
      data: { book: book },
    });
  }
}
