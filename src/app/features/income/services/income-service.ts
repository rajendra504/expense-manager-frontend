import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/models/api-response';
import { FinancialSummaryResponse, IncomeRequest, IncomeResponse, MonthlySummaryResponse, Page } from '../income.model';


@Injectable({ providedIn: 'root' })
export class IncomeService {

  private http = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:8080/api/v1/income';

  getAll(params: any): Observable<ApiResponse<Page<IncomeResponse>>> {
    return this.http.get<ApiResponse<Page<IncomeResponse>>>(this.BASE_URL, { params });
  }

  getById(id: number): Observable<ApiResponse<IncomeResponse>> {
    return this.http.get<ApiResponse<IncomeResponse>>(`${this.BASE_URL}/${id}`);
  }

  create(request: IncomeRequest): Observable<ApiResponse<IncomeResponse>> {
    return this.http.post<ApiResponse<IncomeResponse>>(this.BASE_URL, request);
  }

  update(id: number, request: IncomeRequest): Observable<ApiResponse<IncomeResponse>> {
    return this.http.put<ApiResponse<IncomeResponse>>(`${this.BASE_URL}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }

  getSummary(): Observable<ApiResponse<FinancialSummaryResponse>> {
    return this.http.get<ApiResponse<FinancialSummaryResponse>>(`${this.BASE_URL}/summary`);
  }
  getMonthlySummary(months: number = 6): Observable<ApiResponse<MonthlySummaryResponse[]>> {
    return this.http.get<ApiResponse<MonthlySummaryResponse[]>>(
      `${this.BASE_URL}/monthly-summary`,
      { params: { months: months.toString() } }
    );
  }
}
