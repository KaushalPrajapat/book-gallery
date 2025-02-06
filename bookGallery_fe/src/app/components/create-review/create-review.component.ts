import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserDialogComponent } from '../author-grid/create-user-dialog/create-user-dialog.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-review',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-review.component.html',
  styleUrl: './create-review.component.scss',
})
export class CreateReviewComponent {
  reviewForm: FormGroup;
  bookId: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedRating = 0;
  hoveredRating = 0;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private userService: UserService,
    private dialog: MatDialog,
    private toaster: ToastrService
  ) {
    this.reviewForm = this.fb.group({
      bookReviewTitle: ['', Validators.required],
      bookReview: ['', Validators.required],
      bookReviewRating: [
        0,
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
    });
  }

  ngOnInit() {
    this.bookId = +this.route.snapshot.paramMap.get('bookId')!;
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      const reviewData = {
        ...this.reviewForm.value,
        book: this.bookId,
      };
      console.log(reviewData);

      this.bookService.addBookReview(reviewData).subscribe(
        () => {
          this.toaster.success(
            'Book Review added successfully',
            'review added'
          );
          this.reviewForm.reset({
            bookReviewTitle: '',
            bookReview: '',
            bookReviewRating: 0,
          });
        },
        (error) => {
          this.toaster.error(
            'Book Review add failed' + error.error.message,
            'review add failed'
          );
        }
      );
    }
  }

  getStarArray(rating: number): number[] {
    return Array(5)
      .fill(0)
      .map((_, index) => (rating > index ? 1 : 0));
  }

  rate(rating: number) {
    this.selectedRating = rating;
    this.reviewForm.patchValue({ bookReviewRating: rating });
  }

  hoverRate(rating: number) {
    this.hoveredRating = rating;
  }

  resetHover() {
    this.hoveredRating = 0;
  }
}
