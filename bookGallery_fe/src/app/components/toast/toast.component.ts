import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [],
  template: `
    @if (message) {
    <div class="toast">
      {{ message }}
    </div>

    }
  `,
  styles: [
    `
      .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #333;
        color: white;
        padding: 16px;
        border-radius: 4px;
      }
    `,
  ],
})
export class ToastComponent implements OnInit {
  message: string = '';

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toast$.subscribe((message) => {
      this.message = message;
      setTimeout(() => (this.message = ''), 3000);
    });
  }
}
