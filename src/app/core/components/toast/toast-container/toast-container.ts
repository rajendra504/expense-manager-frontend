import { Component } from '@angular/core';
import { ToastService } from '../../../services/toast-service';
import { ToastType } from '../toast';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toast-container',
  imports: [CommonModule, NgbToastModule],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.scss',
})
export class ToastContainer {
  constructor(public toastService: ToastService) { }

  getToastClass(type: ToastType): string {
    switch (type) {
      case ToastType.SUCCESS:
        return 'bg-success text-white';
      case ToastType.ERROR:
        return 'bg-danger text-white';
      case ToastType.WARNING:
        return 'bg-warning text-dark';
      case ToastType.INFO:
        return 'bg-info text-dark';
      default:
        return '';
    }
  }
}
