import { Component, inject, type OnInit } from '@angular/core';
import {
  FormBuilder,
  type FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { BookService } from '../../../services/book.service';
import { CreateUserDialogComponent } from '../../author-grid/create-user-dialog/create-user-dialog.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss'],
})
export class CreateBookComponent implements OnInit {
  bookForm: FormGroup;
  authorId: number | null = null;
  authorName = '';
  showCreateUser = false;
  isUserNameValid = false;
  toaster = inject(ToastrService);
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private userService: UserService,
    private bookService: BookService
  ) {
    this.bookForm = this.fb.group({
      authorId: [0],
      authorName: ['', Validators.required],
      bookTitle: ['', Validators.required],
      bookDescription: ['', Validators.required],
    });
  }

  ngOnInit() {}

  validateAuthor() {
    const authorName = this.bookForm.get('authorName')?.value;
    this.isUserNameValid = false;
    if (authorName) {
      this.userService.validateUser(authorName).subscribe(
        (response) => {
          if (response) {
            this.authorId = response.id;
            this.authorName = response.name;
            this.showCreateUser = false;
            this.toaster.success(
              'Author is validated : ' + this.authorName,
              'Author validated'
            );
          } else {
            this.showCreateUser = true;
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
    this.toaster.info('opened new author dialog box.', 'new author');
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '400px',
      data: { userName: this.bookForm.get('authorName')?.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authorId = result.id;
        this.authorName = result.name.value;
        this.showCreateUser = false;
        this.bookForm.patchValue({ authorName: result.name, authorId : result.id });
        this.toaster.success(
          'Author ' + this.authorName + ' is created',
          'new author created'
        );
      }
    });
  }

  onSubmit() {
    if (this.bookForm.valid && this.authorId) {
      const bookData = {
        ...this.bookForm.value,
        authorId: this.authorId,
      };
      this.bookService.createBook(bookData).subscribe(
        () => {
          console.log('Book created successfully');
          this.toaster.success(
            'Book Added to Author' + this.authorName,
            'Book Added'
          );
          this.bookForm.reset({
            authorName: this.authorName,
            bookTitle: '',
            bookDescription: '',
          });
        },
        (error) => {
          this.toaster.error(
            'Book by ' + this.authorName + 'failed' + error.error.message,
            'review add failed'
          );
          console.error('Error creating book:', error);
        }
      );
    }
  }
}
