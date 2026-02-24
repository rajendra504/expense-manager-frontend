import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  constructor(private authService: AuthService, private toastService:ToastService){}

    isAdmin():boolean{
      return this.authService.isAdmin();
    }

    isLoggedIn():boolean{
      return this.authService.isAuthenticated();
    }
    logout():void{
      this.authService.logout();
      this.toastService.show('You have been logged out.', 'info','Info');
    }
}
