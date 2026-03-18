import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth-service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../core/services/toast-service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private fb = inject(NonNullableFormBuilder);
  private toastService = inject(ToastService)
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(6)]]
  });

  submitted= false;
  loading= false;
  showPassword = false;

  onSubmit():void{
    this.submitted=true;

    if(this.loginForm.invalid){
      this.toastService.warning("Please fill all required fields");
      return;
    }
    this.loading=true;

    const request = this.loginForm.getRawValue();
    this.authService.login(request).subscribe({
      next:(response)=>{
        if(response.success){
          const token = response.data.token;
          const role = response.data.role;
          this.authService.storeAuthData(token,role);
          this.router.navigate(['/dashboard']);
          console.log('Login successful');
          console.log(response);
          //this.toastService.show('Login successful!', 'success');
          this.toastService.success("Login successful!");
        }
        this.loading=false;
      },
      error:(err)=>{
        console.log(err);
        //this.toastService.error(err.error.message || 'Login failed');
        this.loading=false;
      }
    });
  }
  get f(){
    return this.loginForm.controls;
  }
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  logout():void{
    this.authService.logout();
    console.log("Logout Successfull!!!")
  }
}
