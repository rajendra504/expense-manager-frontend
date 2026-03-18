import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  constructor(private toastService:ToastService){}
  @Output() sidebarToggle = new EventEmitter<void>();

  private authService = inject(AuthService);
  private router = inject(Router);

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin?.() ?? false;
  }

  userEmail(): string {
    return this.authService.getEmail?.() ?? '';
  }

  userInitial(): string {
    const email = this.userEmail();
    return email ? email.charAt(0).toUpperCase() : 'U';
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toastService.info('You have been logged out.');
  }
}
