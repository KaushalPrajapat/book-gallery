import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Author } from '../../../models/author.model';
import { AuthorService } from '../../../services/author.service';
import { MatIcon } from '@angular/material/icon';
import { BookReview } from '../../../models/bookReview.model';
import { BookService } from '../../../services/book.service';
import { CommonModule, DatePipe } from '@angular/common';
@Component({
  selector: 'app-author',
  standalone: true,
  imports: [MatProgressSpinnerModule, RouterLink, CommonModule, DatePipe],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss',
})
export class AuthorComponent implements OnInit {
  author: Author | null = null;
  loading = true;
  error = '';
  icons: any;
  bookReviews: BookReview[] = [];
  doHide: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const authorId = params['authorId'];
      this.loadAuthorData(authorId);
      console.log(this.author);
    });
  }

  private loadAuthorData(authorId: string): void {
    this.loading = true;
    this.authorService.getAuthorByUserId(authorId).subscribe({
      next: (data) => {
        this.author = data;
        this.loading = false;
        this.bookReviews = this.author.reviews;
        console.log(this.author);
      },
      error: (error) => {
        this.error = 'Failed to load author data';
        this.loading = false;
        console.error('Error loading author:', error);
      },
    });
  }

  bookService = inject(BookService);

  loadReviews(userId: number) {
    console.log(userId);

    this.bookService.getAuthorSReviews(userId).subscribe((reviews) => {
      this.bookReviews = reviews;
      console.log(this.bookReviews);
    });
  }

  loadMoreReviews() {
    this.doHide = true;
    if (this.author) {
      this.loadReviews(this.author?.id);
    }
  }
}
