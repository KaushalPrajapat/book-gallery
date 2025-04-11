import { BookResponseDto } from './../../../models/book.response.model';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookSmall } from '../../../models/book.small.model';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { Dialog } from '@angular/cdk/dialog';
import { BookReview } from '../../../models/bookReview.model';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-single-book',
  imports: [RouterLink, ReviewDialogComponent, MatButton],
  templateUrl: './single-book.component.html',
  styleUrl: './single-book.component.scss',
})
export class SingleBookComponent  {
Shortify(arg0: string|undefined) {
return (arg0 ?? '').length > 50 ? (arg0??'').substring(0, 50) + '...' : arg0;
}
  bookReview : BookReview[] | undefined;
  @Input() book: BookSmall | undefined;
  constructor(private dialog: MatDialog) {
  }
  openReviewDialog(book: BookSmall | undefined): void {
    //console.log(book, book?.reviews);
    this.dialog.open(ReviewDialogComponent, {
      width: '500px',
      data: { book: this.book },
    });
  }
}
