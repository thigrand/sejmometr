import {Component, ViewEncapsulation} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {TabsPage} from '../components/layout/tabs/tabs';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  styleUrls: [
    '../assets/css/bootstrap-grid.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
