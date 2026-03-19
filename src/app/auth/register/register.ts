import { Component, inject } from '@angular/core';
import { AuthService } from '../auth-service';
import { Router, RouterModule } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    ]]
  });
  submitted = false;
  loading = false;
  showPassword = false;

  onSubmit():void{
    this.submitted = true;

    if(this.registerForm.invalid){
      return;
    }
    this.loading = true;
    const request = this.registerForm.getRawValue();
    this.authService.register(request).subscribe({
      next:(response)=>{
        if(response.success){
          // alert('User Registration sucessfull, Please Login');
          console.log(response);
          this.router.navigate(['/login']);
        }
        this.loading=false;
      },
      error: (err) => {
        const msg = err?.error?.message || 'Registration failed. Please try again.';
        this.toastService.error(msg);
        this.loading = false;
      }
    });
  }
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  get f(){
    return this.registerForm.controls;
  }
}
