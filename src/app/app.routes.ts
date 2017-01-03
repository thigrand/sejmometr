import { Routes } from '@angular/router';

import { BrowserComponent } from './components/browser/browser.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeputyComponent } from './components/deputy/deputy.component';

export const AppRoutes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'browser', component: BrowserComponent},
  {path: 'deputy', component: DeputyComponent},
];
