import { Component, inject } from '@angular/core';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
  });
  submitted = false;
  loading = false;

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
          alert('User Registration sucessfull, Please Login');
          console.log(response);
          this.router.navigate(['/login']);
        }
        this.loading=false;
      },
      error:(err)=>{
        console.log(err);
        this.loading=false;
      }
    });
  }
  get f(){
    return this.registerForm.controls;
  }
}
