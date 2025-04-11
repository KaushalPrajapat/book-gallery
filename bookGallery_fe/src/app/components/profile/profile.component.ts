import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Author } from '../../models/author.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppState } from '../../stores/auth.state';
import { Store } from '@ngrx/store';
import { fetchLoggedInAuthor } from '../../stores/auth.actions';
import { profileValue } from '../../stores/all.selector';
import { MatButtonModule } from '@angular/material/button';
import { SingleBookComponent } from '../book-grid/single-book/single-book.component';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterLink, MatButtonModule, SingleBookComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  onPageChange($event: number) {
    throw new Error('Method not implemented.');
  }
  author: Author | null | undefined;
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.store.select(profileValue).subscribe((author: Author | null) => {
      this.author = author;
      if (this.author === null) {
        this.getAuthorProfile();
      }
      if (this.author?.dateOfBirth) {
        this.getAgeFromDateOfBirth(this.author.dateOfBirth);
      }
    });
    if (this.author?.dateOfBirth) {
      this.getAgeFromDateOfBirth(this.author.dateOfBirth);
    }
  }

  getAuthorProfile() {
    this.authService.getAuthorProfile().subscribe((resp) => {
      this.author = resp;
      this.store.dispatch(fetchLoggedInAuthor({ profile: this.author }));
    });
  }
  getAgeFromDateOfBirth(dateOfBirth: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }
}
