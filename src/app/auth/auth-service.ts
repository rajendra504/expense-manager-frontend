import { LoginRequest } from './../core/models/login-request';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../core/models/api-response';
import { LoginResponse } from '../core/models/login-response';
import { RegisterRequest } from '../core/models/register-request';
import { RegisterResponse } from '../core/models/register-response';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);

  // private readonly BASE_URL = 'http://localhost:8080/auth';
  private readonly BASE_URL = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly ROLE_KEY = 'user_role';

  login(request:LoginRequest): Observable<ApiResponse<LoginResponse>>{
    return this.http.post<ApiResponse<LoginResponse>>(
      `${this.BASE_URL}/login`,
        request
    );
  }

  register(request: RegisterRequest): Observable<ApiResponse<RegisterResponse>>{
    return this.http.post<ApiResponse<RegisterResponse>>(
      `${this.BASE_URL}/register`,
      request
    );
  }

  storeAuthData(token:string,role:string,email:string):void{
    localStorage.setItem(this.TOKEN_KEY,token);
    localStorage.setItem(this.ROLE_KEY,role);
    localStorage.setItem('userEmail', email);
    console.log("token - "+token);
    console.log(role);
  }

  getToken(): string | null{
   return localStorage.getItem(this.TOKEN_KEY);
  }

  getRole(): string | null{
    return localStorage.getItem(this.ROLE_KEY);
  }
  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }
  getEmail(): string {
    return localStorage.getItem('userEmail') ?? '';
  }
  isAuthenticated():boolean{
    if(this.getToken()){
      return true;
    }else{
      return false;
    }
  }

  logout():void{
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
  }
}
