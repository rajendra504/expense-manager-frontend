export interface ExpenseRequest {
  title: string;
  description?: string;
  amount: number;
  date: string;
  category: string;
}

export interface ExpenseResponse {
  id: number;
  title: string;
  description: string;
  amount: number;
  category: string;
  date?: string;
  userId: number;
}

export interface ExpenseFilter {
  page?: number;
  size?: number;
  sort?: string;
  category?: string;
  minAmount?: number;
  maxAmount?: number;
  search?: string;
}
export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}
