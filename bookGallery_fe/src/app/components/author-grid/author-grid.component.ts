import { PaginationStateService } from './../../services/pagination-state.service';
import { Component, Pipe } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../models/author.model';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-author-grid',
  imports: [
    DatePipe,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    MatPaginatorModule
  ],
  standalone: true,
  templateUrl: './author-grid.component.html',
  styleUrl: './author-grid.component.scss',
})
export class AuthorGridComponent {

  authors: Author[] = [];
  currentPage = 1;
  pageSize = 9;
  totalAuthors = 0;

  filterdAuthor: Author[] = [];

  calculatePageSize() {
    const blockWidth = 300;
    const blockHeight = 250;
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    const columns = Math.floor(screenWidth / blockWidth);
    const rows = Math.floor(screenHeight / blockHeight);
    //console.log('columns:', columns, 'rows:', rows);

    this.pageSize = rows * columns <= 10 ? 9 : rows * columns;
    this.pageSize = rows * columns >= 20 ? 18 : rows * columns;
  }

  constructor(
    private authorService: AuthorService,
    private paginationStateService: PaginationStateService
  ) {
    const state = this.paginationStateService.getAuthorGridState();
    this.currentPage = state.page;
    this.pageSize = state.pageSize;
    this.calculatePageSize();
  }

  ngOnInit() {
    this.fetchCountOfAuthor();
    this.loadAuthors();
  }

  filterName(search: string)  {
    //console.log(search);

    this.filterdAuthor = this.authors.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
  }

  renderAuthor(authorId: number) {
    //console.log('renderAuthor', authorId);

    throw new Error('Method not implemented.');
    }

  loadAuthors() {
    this.authorService
      .getAuthors(this.pageSize, this.currentPage - 1)
      .subscribe(
        (response) => {
          //console.log(response);
          this.authors = response;
          this.filterName('')
        },
        (error) => console.error('Error fetching authors:', error)
      );
  }

  getNumberOfBooks(author: Author): number {
    return author.books ? author.books.length : 0;
  }

  fetchCountOfAuthor() {
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
    this.currentPage = page;
    this.paginationStateService.setAuthorGridState(
      this.currentPage,
      this.pageSize
    );
    this.loadAuthors();
  }

  get totalPages(): number {
    return Math.ceil(this.totalAuthors / this.pageSize);
  }
  getPaginationRange(): (number | string)[] {
    const range: (number | string)[] = [];
    const totalPages = this.totalPages;
    const current = this.currentPage;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      if (current <= 3) {
        range.push(1, 2, 3, 4, '...', totalPages - 1, totalPages);
      } else if (current >= totalPages - 2) {
        range.push(
          1,
          2,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        range.push(
          1,
          '...',
          current - 1,
          current,
          current + 1,
          '...',
          totalPages
        );
      }
    }

    return range;
  }
  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1; // Reset to first page when changing page size
    this.paginationStateService.setAuthorGridState(
      this.currentPage,
      this.pageSize
    );
    this.loadAuthors();
  }
}
