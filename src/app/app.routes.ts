import { Routes } from '@angular/router';
import { TransactionComponent } from './transaction/transaction.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'new-transaction/:type',
    component: TransactionComponent,
  },
  {
    path: 'update-transaction/:transactionId',
    component: TransactionComponent,
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
