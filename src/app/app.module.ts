import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import {RouterModule} from '@angular/router';
import {AppRoutes} from './app.routes';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PartiesComponent } from './components/parties/parties.component';
import { TileComponent } from './components/tile/tile.component';
import { ListComponent } from './components/list/list.component';
import { ChartComponent } from './components/chart/chart.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import {
  DeputiesService,
  HttpService,
  KrsService,
  ParliamentSessionsService,
  PublicOrdersService,
  SejmometrService
} from '../providers/';
import {SejmometrCfg} from '../cfg/';
import { ChartDirective } from './directives/chart.directive';
import { BrowserComponent } from './components/browser/browser.component';
import { ChartHelperService } from './services/chart-helper.service';
import { DeputyComponent } from './components/deputy/deputy.component';
import { ComponentComponent } from './components/component/component.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    PartiesComponent,
    TileComponent,
    ListComponent,
    ChartComponent,
    ChartDirective,
    BrowserComponent,
    DeputyComponent,
    ComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    ChartsModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    HttpService,
    KrsService,
    PublicOrdersService,
    DeputiesService,
    ParliamentSessionsService,
    SejmometrService,
    ChartHelperService,
    SejmometrCfg
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
