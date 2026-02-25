import { Routes } from '@angular/router';
import { Dashboard } from '../dashboard/dashboard';
import { authGuard } from '../../core/guards/auth-guard';
import { ExpenseList } from './expense-list/expense-list';


export const EXPENSE_ROUTES: Routes = [
  {
    path: '',
    component: ExpenseList,
    canActivate: [authGuard]
  }
];
