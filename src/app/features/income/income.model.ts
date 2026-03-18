export interface IncomeRequest {
  source: string;
  amount: number;
  date: string;
  description?: string;
}

export interface IncomeResponse {
  id: number;
  source: string;
  amount: number;
  date: string;
  description?: string;
  userId: number;
}

export interface FinancialSummaryResponse {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export interface MonthlySummaryResponse {
  year: number;
  month: number;
  totalIncome: number;
  totalExpense: number;
}