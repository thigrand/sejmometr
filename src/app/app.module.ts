import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

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
  ParliamentSpeechService,
  PublicOrdersService,
  SejmometrService
} from '../providers/';
import {SejmometrCfg} from '../cfg/';
import { ChartDirective } from './directives/chart.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    PartiesComponent,
    TileComponent,
    ListComponent,
    ChartComponent,
    ChartDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    ChartsModule
  ],
  providers: [
    HttpService,
    KrsService,
    PublicOrdersService,
    DeputiesService,
    ParliamentSessionsService,
    ParliamentSpeechService,
    SejmometrService,
    SejmometrCfg
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
