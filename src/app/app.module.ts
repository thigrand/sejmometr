import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {
  DeputiesService,
  HttpService,
  KrsService,
  ParliamentSessionsService,
  ParliamentSpeechService,
  PublicOrdersService,
  SejmometrService
} from "../providers/";

@NgModule({
  declarations: [
    AboutPage,
    ContactPage,
    HomePage,
    MyApp,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    HttpService,
    KrsService,
    PublicOrdersService,
    DeputiesService,
    ParliamentSessionsService,
    ParliamentSpeechService,
    SejmometrService
  ]
})
export class AppModule {}
