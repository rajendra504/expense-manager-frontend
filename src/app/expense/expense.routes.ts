import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from '../core/guards/auth-guard';


export const EXPENSE_ROUTES: Routes = [
  {
    path: '',
    component: Dashboard,
    canActivate: [authGuard]
  }
];
