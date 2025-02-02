import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss',
})
export class CreateUserDialogComponent {
  userForm: FormGroup;
  isValidUserName: boolean = true;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string },
    private userService: UserService,
    private router: Router,
    private toaster: ToastrService
  ) {
    this.userForm = this.fb.group({
      userId: [data.userId, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      dateOfBirth: [''],
      jobTitle: [''],
    });
  }

  onSubmit() {
    if (this.userForm.valid && this.isValidUserName) {
      this.userService.createUser(this.userForm.value).subscribe(
        (response) => {
          this.dialogRef.close({
            ...response,
            userName: this.userForm.get('userId'),
          });
          this.toaster.success(
            'Author created successfully',
            'Author Created'
          );
        },
        (error) => {
          this.toaster.error(
            'Author with username ' +
              this.userForm.value.get('userId') +
              ' creation failed' +
              error.error.message,
            'Author not created'
          );
          console.error('Error creating user:', error);
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
    this.toaster.warning('Author creation aborted', 'Aborted');
  }

  validateUserName(userName: string) {
    this.isValidUserName = true;
    const userId = userName;
    if (userId) {
      this.userService.validateUser(userId).subscribe(
        (response) => {
          this.toaster.error(
            "Username '" + userName + "' is already taken : ",
            'Author validate'
          );
          if (response) {
            this.isValidUserName = false;
          } else {
          }
        },
        (error) => {
          this.toaster.success(
            "Username '" + userName + "' is valid to use ",
            'Author'
          );
          this.isValidUserName = true;
        }
      );
    }
  }
}
