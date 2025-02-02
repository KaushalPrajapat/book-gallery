import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CreateUserDialogComponent } from '../author-grid/create-user-dialog/create-user-dialog.component';

@Component({
  selector: 'app-header',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
   reviewForm: FormGroup;
    authorId: number | null = null;
    constructor(
      private fb: FormBuilder,
      private dialog: MatDialog
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
}
