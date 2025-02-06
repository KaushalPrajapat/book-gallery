import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CreateUserDialogComponent } from '../author-grid/create-user-dialog/create-user-dialog.component';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { SigninDialogComponent } from '../auth/signin-dialog/signin-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  authorName: string = '';
  reviewForm: FormGroup;
  authorId: number | null = null;
  isSignedIn: boolean;
  notSignedIn: boolean;
  isLoading: boolean = true;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    tokenService: TokenService
  ) {
    this.isSignedIn = this.tokenService.getAccessToken() != null;
    this.notSignedIn = this.tokenService.getAccessToken() == null;
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
  ngOnInit(): void {
    if (this.tokenService.getAccessToken() != null) {
      this.loadAuthorProfile();
      this.isLoading = false;
    }
  }

  openCreateUserDialog() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '500px',
      data: { userName: this.reviewForm.get('userName')?.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.authorId = result.id;
        console.log(this.authorId);
      }
    });
  }

  auth = inject(AuthService);
  tokenService = inject(TokenService);
  openSigninDialog() {
    const dialogRef = this.dialog.open(SigninDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { accessToken, refreshToken } = result;
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);
        this.isSignedIn = true;
        this.notSignedIn = false;
        this.router.navigate(['/profile']);
      }
    });
  }
  signOut() {
    this.authService.signOut().subscribe((resp) => {
      console.log(resp);
      this.isSignedIn = false;
      this.notSignedIn = true;
      this.router.navigate(['/']);
    });
  }
  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  loadAuthorProfile() {
    this.authService.getAuthorProfile().subscribe(
      (profile) => {
        console.log(profile);
        this.authorName = `${profile.name}`;
      },
      (error) => {
        console.error('Error loading author profile:', error);
      }
    );
  }
}
