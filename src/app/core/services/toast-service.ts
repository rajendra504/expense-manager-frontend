import { Injectable } from '@angular/core';
import { AppToast, ToastType } from '../components/toast/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: AppToast[] = [];
  private counter = 0;

  private show(title: string, message: string, type: ToastType, delay = 4000) {
    this.toasts.push({
      id: ++this.counter,
      title,
      message,
      type,
      delay
    });
  }

  success(message: string, title = 'Success') {
    this.show(title, message, ToastType.SUCCESS);
  }

  error(message: string, title = 'Error') {
    this.show(title, message, ToastType.ERROR);
  }

  warning(message: string, title = 'Warning') {
    this.show(title, message, ToastType.WARNING);
  }

  info(message: string, title = 'Info') {
    this.show(title, message, ToastType.INFO);
  }

  remove(toast: AppToast) {
    this.toasts = this.toasts.filter(t => t.id !== toast.id);
  }
}
