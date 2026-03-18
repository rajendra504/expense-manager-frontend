import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @Input() isOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();

  private authService = inject(AuthService);

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin?.() ?? false;
  }

  close(): void {
    this.closeSidebar.emit();
  }

  closeOnMobile(): void {
    if (window.innerWidth < 992) {
      this.close();
    }
  }
}
