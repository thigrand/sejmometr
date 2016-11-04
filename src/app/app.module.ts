import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {SejmometrCfg} from '../cfg/';
import {
  DeputiesService,
  HttpService,
  KrsService,
  ParliamentSessionsService,
  ParliamentSpeechService,
  PublicOrdersService,
  SejmometrService
} from '../providers/';
import * as components from '../components/';

@NgModule({
  declarations: [
    MyApp,
    components.layout.TabsPage,
    components.pages.DashboardPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    components.layout.TabsPage,
    components.pages.DashboardPage
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
  ]
})
export class AppModule {}
