import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-review-dialog',
  imports: [MatIconModule, RouterLink, CommonModule],
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.scss',
})
export class ReviewDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ReviewDialogComponent>
  ) {}
  closeDialog(): void {
    this.dialogRef.close();
  }
  getStarArray(rating: number): number[] {
    return Array(5)
      .fill(0)
      .map((_, index) => (index < rating ? 1 : 0));
  }
  getSizeOfReviews() {
    if (this.data?.book?.reviews === undefined) {
      return 0;
    } else return this.data.book.reviews.length;
  }
}
