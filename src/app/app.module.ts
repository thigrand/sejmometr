// ng2
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// Modules
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AlertModule,
         ButtonsModule,
         TabsModule } from 'ng2-bootstrap';

import 'lodash';
// App
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { SejmometrCfg } from '../cfg/';
import * as Components from './components';
import * as Directives from './directives';
import * as Services from './services/';
import { Const } from '../app/commons/constants';

@NgModule({
  declarations: [
    AppComponent,
    Components.BrowserComponent,
    Components.ChartComponent,
    Components.ComponentComponent,
    Components.DashboardComponent,
    Components.DeputyComponent,
    Components.ListComponent,
    Components.NavbarComponent,
    Components.PartiesComponent,
    Components.TileComponent,
    Directives.ChartDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    RouterModule.forRoot(AppRoutes),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [
    Services.HttpService,
    Services.KrsService,
    Services.PublicOrdersService,
    Services.DeputiesService,
    Services.ParliamentSessionsService,
    Services.SejmometrService,
    Services.ChartHelperService,
    Services.UtilitiesService,
    Services.SegregateDeputiesService,
    SejmometrCfg,
    Const
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
