import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../models/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _toasts = new BehaviorSubject<Toast[]>([]);
  toasts$ = this._toasts.asObservable();

  show(message: string, type: Toast['type'] = 'info', header?: string, delay: number = 3000) {
    const toast: Toast = { message, type, header, delay };
    this._toasts.next([...this._toasts.getValue(), toast]);
  }

  remove(toast: Toast) {
    const filtered = this._toasts.getValue().filter(t => t !== toast);
    this._toasts.next(filtered);
  }
}
