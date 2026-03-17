import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard';
import { ExpenseList } from './expense-list/expense-list';


export const EXPENSE_ROUTES: Routes = [
  {
    path: '',
    component: ExpenseList,
    canActivate: [authGuard]
  },
  {
    path:'add',
    loadComponent:()=>
      import('./add-expense/add-expense').then(m=>m.AddExpense),
    canActivate: [authGuard]
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./edit-expense/edit-expense').then(m => m.EditExpense),
    canActivate: [authGuard]
  },
  {
    path: 'view/:id',
    loadComponent: () =>
      import('./view-expense/view-expense').then(m => m.ViewExpense),
    canActivate: [authGuard]
  }
];
