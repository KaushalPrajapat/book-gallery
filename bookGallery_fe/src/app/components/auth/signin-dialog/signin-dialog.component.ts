import { TokenService } from './../../../services/token.service';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { AppState } from '../../../stores/auth.state';
import { Store } from '@ngrx/store';
import { signin } from '../../../stores/auth.actions';
import { Auth } from '../../../stores/auth.model';

@Component({
  selector: 'app-signin-dialog',
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
    MatDialogModule,
  ],
  templateUrl: './signin-dialog.component.html',
  styleUrls: ['./signin-dialog.component.scss'],
})
export class SigninDialogComponent {
  signinForm: FormGroup;
  errorMessage = '';
  hidePassword = true;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<SigninDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private tokenService: TokenService,
    private store: Store<AppState>
  ) {
    this.signinForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      this.authService.signin(this.signinForm.value).subscribe(
        (response) => {
          this.tokenService.setAccessToken(response['accessToken']);
          this.tokenService.setrefreshToken(response['refreshToken']);
          this.store.dispatch(
            signin({
              auth: new Auth(response['accessToken'], response['refreshToken']),
            })
          );
          //console.log('all set');
          this.dialogRef.close(response);
          this.router.navigate(['/profile']);
        },
        (error) => {
          this.errorMessage = 'Invalid email or password';
        }
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
