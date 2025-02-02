import { PaginationStateService } from './../../services/pagination-state.service';
import { Component, Pipe } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../models/author.model';
import { RouterLink } from '@angular/router';
import {  CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-author-grid',
  imports: [RouterLink, DatePipe, CommonModule],
  standalone: true,
  templateUrl: './author-grid.component.html',
  styleUrl: './author-grid.component.scss',
})
export class AuthorGridComponent {
  authors: Author[] = [];
  currentPage = 1;
  pageSize = 9;
  totalAuthors = 0;
// Method to calculate page size based on screen dimensions
calculatePageSize() {
  const blockWidth = 350;
  
  const screenWidth = window.innerWidth;

  const columns = Math.floor(screenWidth / blockWidth);

  this.pageSize = 3 * columns;

  console.log(`Calculated pageSize: ${this.pageSize}, ${columns}`);
}

  constructor(private authorService: AuthorService,
    private paginationStateService: PaginationStateService
  ) {
    const state = this.paginationStateService.getAuthorGridState()
    this.currentPage = state.page
    this.pageSize = state.pageSize
    this.calculatePageSize()
  }

  ngOnInit() {
    this.fetchCountOfAuthor()
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorService
      .getAuthors(this.pageSize, this.currentPage-1)
      .subscribe(
        (response) => {
          console.log(response);

          this.authors = response;
        },
        (error) => console.error('Error fetching authors:', error)
      );
  }

  getNumberOfBooks(author: Author): number {
    return author.books ? author.books.length : 0;
  }

  fetchCountOfAuthor(){
    this.authorService.getCountOfRecords().subscribe((data) => {
      this.totalAuthors = data;

    });
  }


  getAverageRating(author: Author): number {
    if (!author.reviews || author.reviews.length === 0) {
      return 0;
    }
    const totalRating = author.reviews.reduce(
      (sum, review) => sum + review.bookReviewRating,
      0
    );
    return totalRating / author.reviews.length;
  }

  onPageChange(page: number) {
    this.currentPage = page
    this.paginationStateService.setAuthorGridState(this.currentPage, this.pageSize)
    this.loadAuthors();
  }

  get totalPages(): number {
    return Math.ceil(this.totalAuthors / this.pageSize);
  }
  getPaginationRange(): (number | string)[] {
    const range: (number | string)[] = []
    const totalPages = this.totalPages
    const current = this.currentPage

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i)
      }
    } else {
      if (current <= 3) {
        range.push(1, 2, 3, 4, "...", totalPages - 1, totalPages)
      } else if (current >= totalPages - 2) {
        range.push(1, 2, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        range.push(1, "...", current - 1, current, current + 1, "...", totalPages)
      }
    }

    return range
  }
  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize
    this.currentPage = 1 // Reset to first page when changing page size
    this.paginationStateService.setAuthorGridState(this.currentPage, this.pageSize)
    this.loadAuthors()
  }
}
