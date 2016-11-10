import {Component, OnInit} from '@angular/core';
import {SejmometrService} from '../../../providers/';
import {SejmometrCfg} from '../../../cfg/SejmometrCfg';
import {HttpService} from '../../../providers/http';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage implements OnInit {
  private parties = [];
  private mostExpensiveDeputies: Array<any> = [];
  private partiesCfg;
  constructor(
    private sejmometrService: SejmometrService,
    private sejmometrCfg: SejmometrCfg,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.partiesCfg = this.sejmometrCfg.politicalPartiesClubsData;

    this.sejmometrService.getSubject('deputiesIndexedByPP').subscribe(data => {
      this.parties = data;
    });
    this.sejmometrService.getSubject('mostExpensiveDeputies').subscribe(mostExpensiveDeputies => {
      this.mostExpensiveDeputies = mostExpensiveDeputies.slice(0, 5);
    });
  }
}
