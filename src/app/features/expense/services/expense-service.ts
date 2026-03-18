import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/models/api-response';
import { ExpenseFilter, ExpenseRequest, ExpenseResponse, Page } from '../expense';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {

  private http = inject(HttpClient);
  // private readonly BASE_URL = 'http://localhost:8080/api/v1/expenses'
  private readonly BASE_URL = `${environment.apiUrl}/api/v1/expenses`;

  // getAllExpenses():Observable<ApiResponse<ExpenseResponse>>{
  //  return this.http.get<ApiResponse<ExpenseResponse>>(this.BASE_URL);
  // }
  getAll(filters: ExpenseFilter):Observable<ApiResponse<Page<ExpenseResponse>>> {
    return this.http.get<ApiResponse<Page<ExpenseResponse>>>(
      this.BASE_URL,
      { params: filters as any }
    );
  }
  getExpenseById(id:number): Observable<ApiResponse<ExpenseResponse>> {
    return this.http.get<ApiResponse<ExpenseResponse>>(
      `${this.BASE_URL}/${id}`
    );
  }
  createExpense(request:ExpenseRequest): Observable<ApiResponse<ExpenseResponse>> {
    return this.http.post<ApiResponse<ExpenseResponse>>(this.BASE_URL,request);
  }
  updateExpenseById(id: number, request:ExpenseRequest): Observable<ApiResponse<ExpenseResponse>> {
    return this.http.put<ApiResponse<ExpenseResponse>>(`${this.BASE_URL}/${id}`,request);
  }
  getCategories(): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<string[]>>(`${this.BASE_URL}/categories`);
  }
  deleteExpenseById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }

}
