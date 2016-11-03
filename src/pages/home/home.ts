import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpService} from '../../providers/http';
import {SejmometrService} from '../../providers/sejmometr';
import {Subject} from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  deputiesIndexedSubject: Subject<any>;
  constructor(
    public navCtrl: NavController,
    private httpService: HttpService,
    private sejmometrService: SejmometrService
  ) {
  }

  ngOnInit() {
    this.sejmometrService.refreshDeputiesIndexedByPoliticalParty();
    this.deputiesIndexedSubject = this.sejmometrService.deputiesIndexedByPP;
    this.deputiesIndexedSubject.subscribe(data => {
      console.log(data);
    });
  }
}
