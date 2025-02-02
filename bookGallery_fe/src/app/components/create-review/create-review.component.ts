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
  authorId: number | null = null;
  authorName = '';
  isUserNameValid: boolean = false;
  userName: string = '';
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
      userName: ['', Validators.required],
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
    if (this.reviewForm.valid && this.authorId) {
      const reviewData = {
        ...this.reviewForm.value,
        book: this.bookId,
        bookReviewAuthor: this.authorId,
      };
      console.log(reviewData);

      this.bookService.addBookReview(reviewData).subscribe(
        () => {
          this.toaster.success(
            'Book Review by ' + this.userName + ' added successfully',
            'review added'
          );
          this.reviewForm.reset({
            authorName: this.authorName,
            bookReviewTitle: '',
            bookReview: '',
            bookReviewRating: 0,
            userName: '',
          });
          // this.router.navigate(['/full-book', this.bookId]);
        },
        (error) => {
          this.toaster.error(
            'Book Review by ' + this.userName + ' failed' + error.error.message,
            'review add failed'
          );
        }
      );
    }
  }

  validateUsername() {
    const userId: string =
      this.reviewForm.get('userName')?.value != null
        ? this.reviewForm.get('userName')?.value
        : this.authorId;
    console.log(userId);
    this.authorId = null;
    this.isUserNameValid = false;
    if (userId) {
      this.userService.validateUser(userId).subscribe(
        (response) => {
          this.toaster.success(
            'Author is validated : ' + this.authorName,
            'Author validate'
          );
          if (response) {
            this.authorId = response.id;
            this.authorName = response.name;
            this.isUserNameValid = false;
          }
        },
        (error) => {
          this.isUserNameValid = true;
          this.toaster.error(
            'Author is invalid ' + this.authorName + error.error.message,
            'Author invalid'
          );
        }
      );
    }
  }

  openCreateUserDialog() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '500px',
      data: { userName: this.reviewForm.get('userName')?.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authorId = result.id;
        this.authorName = result.name;
        this.userName = result.userName.value;
        this.isUserNameValid = true;
        this.validateUsername();
        this.reviewForm.patchValue({ userName: result.name });
      }
    });
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
