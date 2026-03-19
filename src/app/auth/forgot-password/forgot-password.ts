import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth-service';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {

  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  // step 1 = enter email, step 2 = enter OTP + new password
  step = 1;
  submittedEmail = false;
  submittedReset = false;
  loadingEmail = false;
  loadingReset = false;
  sentEmail = '';

  emailForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/)
    ]]
  });

  resetForm = this.fb.group({
    otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    newPassword: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    ]],
    confirmPassword: ['', Validators.required]
  });

  get fe() { return this.emailForm.controls; }
  get fr() { return this.resetForm.controls; }

  onSendOtp(): void {
    this.submittedEmail = true;
    if (this.emailForm.invalid) return;

    this.loadingEmail = true;
    const email = this.emailForm.value.email!;

    this.authService.forgotPassword(email).subscribe({
      next: (res) => {
        if (res.success) {
          this.sentEmail = email;
          this.step = 2;
          this.toastService.success('OTP sent! Check your inbox.');
        }
        this.loadingEmail = false;
      },
      error: (err) => {
        this.toastService.error(err?.error?.message || 'Failed to send OTP');
        this.loadingEmail = false;
      }
    });
  }

  onResetPassword(): void {
    this.submittedReset = true;
    if (this.resetForm.invalid) return;

    const { otp, newPassword, confirmPassword } = this.resetForm.value;
    if (newPassword !== confirmPassword) {
      this.toastService.error('Passwords do not match');
      return;
    }

    this.loadingReset = true;

    this.authService.resetPassword(this.sentEmail, otp!, newPassword!).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastService.success('Password reset! Please login.');
          this.router.navigate(['/login']);
        }
        this.loadingReset = false;
      },
      error: (err) => {
        this.toastService.error(err?.error?.message || 'Reset failed. Check your OTP.');
        this.loadingReset = false;
      }
    });
  }

  resendOtp(): void {
    this.step = 1;
    this.submittedEmail = false;
    this.resetForm.reset();
  }

  showPassword = false;
  showConfirm = false;
  togglePassword(): void { this.showPassword = !this.showPassword; }
  toggleConfirm(): void { this.showConfirm = !this.showConfirm; }
}
