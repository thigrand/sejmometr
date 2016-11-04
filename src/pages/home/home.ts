import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SejmometrService} from '../../providers/sejmometr';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  constructor(
    public navCtrl: NavController,
    private sejmometrService: SejmometrService
  ) {
  }

  ngOnInit() {
    this.sejmometrService.getDeputiesIndexedByPP().subscribe(data => {
      console.log(data);
    });

    this.sejmometrService.getDeputiesByPP('2').subscribe(data => {
      console.log(data.Dataobject);
    });
  }
}
