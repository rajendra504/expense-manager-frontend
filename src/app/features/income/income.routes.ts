import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard';
import { IncomeList } from './income-list/income-list';


export const  INCOME_ROUTES: Routes = [
  {
    path: '',
    component: IncomeList,
    canActivate: [authGuard]
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./income-form/income-form').then(m => m.IncomeForm),
    canActivate: [authGuard]
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./income-form/income-form').then(m => m.IncomeForm),
    canActivate: [authGuard]
  },
  // {
  //   path: 'dashboard',
  //   loadComponent: () =>
  //     import('../dashboard/dashboard').then(m => m.Dashboard),
  //   canActivate: [authGuard]
  // },
  {
    path: 'view/:id',
    loadComponent: () =>
      import('./income-view/income-view').then(m => m.IncomeView),
    canActivate: [authGuard]
  }
];
