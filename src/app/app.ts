import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/navbar/navbar";
import { ToastContainer } from "./core/components/toast/toast-container/toast-container";
import { ParticlesService } from './shared/services/particles-service';
import { AuthService } from './auth/auth-service';
import { Sidebar } from './shared/sidebar/sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, ToastContainer, Sidebar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'expense-manager-frontend';
  constructor(private particles: ParticlesService) { }
  ngOnInit() { this.particles.init(); }
  private authService = inject(AuthService);
  sidebarOpen = false;

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
