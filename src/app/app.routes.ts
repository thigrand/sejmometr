import { Routes } from '@angular/router';

import { ListComponent } from './components';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeputyComponent } from './components/deputy/deputy.component';

export const AppRoutes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'browser', component: ListComponent},
  {path: 'browser/:id', component: ListComponent},
  {path: 'deputy/:id', component: DeputyComponent},
];
