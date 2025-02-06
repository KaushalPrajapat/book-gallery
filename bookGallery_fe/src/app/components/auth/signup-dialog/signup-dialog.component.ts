import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup-dialog',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signup-dialog.component.html',
  styleUrl: './signup-dialog.component.scss',
})
export class SignupDialogComponent {
  signupForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<SignupDialogComponent>
  ) {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        phone: [''],
        dateOfBirth: [''],
        jobTitle: [''],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe(
        (response) => {
          this.dialogRef.close(true);
        },
        (error) => {
          this.errorMessage = 'Error creating account. Please try again.';
        }
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
