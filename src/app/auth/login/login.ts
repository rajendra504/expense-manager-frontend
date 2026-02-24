import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth-service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private fb = inject(NonNullableFormBuilder);
  private toastService = inject(ToastService)
  private authService = inject(AuthService);
  loginForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(6)]]
  });

  submitted= false;
  loading= false;

  onSubmit():void{
    this.submitted=true;

    if(this.loginForm.invalid){
      this.toastService.show('Please fill all required fields', 'warning', 'Warning');
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
          console.log('Login successful');
          console.log(response);
          //this.toastService.show('Login successful!', 'success');
          this.toastService.show(`Login successful! Welcome ${role}`, 'success','Success');
        }
        this.loading=false;
      },
      error:(err)=>{
        console.log(err);
        this.toastService.show(err.error.message || 'Login failed', 'error','Error');
        this.loading=false;
      }
    });
  }
  get f(){
    return this.loginForm.controls;
  }
  logout():void{
    this.authService.logout();
    console.log("Logout Successfull!!!")
  }
}
