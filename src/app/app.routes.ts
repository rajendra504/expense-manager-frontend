import { Login } from './auth/login/login';
import { Routes } from '@angular/router';
import { Register } from './auth/register/register';
import { Admin } from './features/admin/admin';
import { adminGuard } from './core/guards/admin-guard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'expenses',
    loadChildren: () =>
      import('./features/expense/expense.routes').then(m => m.EXPENSE_ROUTES)
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin')
      .then(m => m.Admin),
    canActivate: [authGuard, adminGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
