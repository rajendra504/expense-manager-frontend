// toast-container.ts
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
      case ToastType.SUCCESS: return 'toast-success';
      case ToastType.ERROR: return 'toast-error';
      case ToastType.WARNING: return 'toast-warning';
      case ToastType.INFO: return 'toast-info';
      default: return '';
    }
  }

  getToastIcon(type: ToastType): string {
    switch (type) {
      case ToastType.SUCCESS: return '✓';
      case ToastType.ERROR: return '✕';
      case ToastType.WARNING: return '⚠';
      case ToastType.INFO: return 'i';
      default: return '';
    }
  }
}
