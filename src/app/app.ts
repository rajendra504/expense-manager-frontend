import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/navbar/navbar";
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { Toast } from './core/models/toast';
import { ToastService } from './core/services/toast-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, NgbToastModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'expense-manager-frontend';

  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {
    this.toastService.toasts$.subscribe(ts => this.toasts = ts);
  }

  remove(toast: Toast) {
    this.toastService.remove(toast);
  }
}
