import { Author, AuthorTemp } from '../../../models/author.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { BookSmall } from '../../../models/book.small.model';
import { BookReview } from '../../../models/bookReview.model';

@Component({
  selector: 'app-full-book',
  imports: [RouterLink],
  templateUrl: './full-book.component.html',
  styleUrl: './full-book.component.scss',
})
export class FullBookViewComponent implements OnInit {
  book: BookSmall | null = null;
  reviews: BookReview[] = [];
  author : AuthorTemp | undefined;
  currentPage = 1;
  doHide: boolean = false;
  noReview : boolean= false;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBookDetails(bookId);
    // this.loadReviews(bookId);
    this.loadAuthor(bookId);
  }
 


  loadBookDetails(bookId: number) {
    this.bookService.getBook(bookId).subscribe((book) => {
      this.book = book;
      this.reviews = book.reviews
      if(this.reviews.length == 0){
        this.noReview = true
      }
    });
  }

  loadReviews(bookId: number) {
    this.bookService.getBookReviews(bookId).subscribe((reviews) => {
      this.reviews = reviews;
    });
  }

  loadAuthor(bookId: number) {
    this.bookService.getBookAuthor(bookId).subscribe((author) => {
      this.author = author;
    });
  }

  loadMoreReviews() {
    this.doHide = true;
    if (this.book) {
      this.loadReviews(this.book.bookId);
    }
  }
}
