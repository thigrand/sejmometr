import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SejmometrService} from '../../../providers/';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage implements OnInit {
  private parties = [];
  constructor(
    public navCtrl: NavController,
    private sejmometrService: SejmometrService
  ) {}

  ngOnInit() {
    this.sejmometrService.getDeputiesIndexedByPP().subscribe(data => {
      this.parties = data;
      console.log(data);
    });
  }
}
