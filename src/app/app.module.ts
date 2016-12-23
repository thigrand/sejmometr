import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {SejmometrCfg} from '../cfg/';
import * as providers from '../providers/';
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
    providers.HttpService,
    providers.KrsService,
    providers.PublicOrdersService,
    providers.DeputiesService,
    providers.ParliamentSessionsService,
    providers.ParliamentSpeechService,
    providers.SejmometrService,
    providers.UtilitiesService,
    SejmometrCfg
  ]
})
export class AppModule {}
