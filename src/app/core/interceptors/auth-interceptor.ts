import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();
  const router = inject(Router);
  const toastService = inject(ToastService);

  if(token){
    const authReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }
  return next(req).pipe(
    catchError(error =>{
      if(error.status == 401){
        authService.logout();
        router.navigate(['/login']);
      }
      if (error.error?.message) {
        toastService.error(error.error.message); // later replace with toaster
      }
      return throwError(()=> error);
    })
  );
};
