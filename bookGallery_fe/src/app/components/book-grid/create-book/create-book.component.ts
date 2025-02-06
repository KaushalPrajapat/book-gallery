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
  toaster = inject(ToastrService);
  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.bookForm = this.fb.group({
      bookTitle: ['', Validators.required],
      bookDescription: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.bookForm.valid) {
      const bookData = {
        ...this.bookForm.value,
      };
      this.bookService.createBook(bookData).subscribe(
        () => {
          console.log('Book created successfully');
          this.toaster.success('Book Added Successfully', 'Book Added');
          this.bookForm.reset({
            bookTitle: '',
            bookDescription: '',
          });
        },
        (error) => {
          this.toaster.error(
            'Book adding failed' + error.error.message,
            'Error'
          );
          console.error('Error creating book:', error);
        }
      );
    }
  }
}
