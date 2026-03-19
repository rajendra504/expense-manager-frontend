import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [authGuard]
  },
  {
    path: 'expenses',
    loadChildren: () => import('./features/expense/expense.routes').then(m => m.EXPENSE_ROUTES)
  },
  {
    path: 'income',
    loadChildren: () => import('./features/income/income.routes').then(m => m.INCOME_ROUTES)
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin').then(m => m.Admin),
    canActivate: [authGuard, adminGuard]
  },

  { path: '**', redirectTo: 'login' }
];
