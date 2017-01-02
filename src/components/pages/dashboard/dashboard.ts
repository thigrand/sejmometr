import {Component, OnInit} from '@angular/core';
import {SejmometrCfg} from '../../../cfg/SejmometrCfg';
import {SejmometrService} from '../../../providers/';
import {
  DeputiesSortedByPPRow,
  DeputyExpenseArrayItem
} from '../../../interfaces';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage implements OnInit {
  private parties: Array<DeputiesSortedByPPRow> = [];
  private mostExpensiveDeputies: Array<DeputyExpenseArrayItem> = [];
  private partiesCfg;

  constructor(
    private sejmometrService: SejmometrService,
    private sejmometrCfg: SejmometrCfg
  ) {}

  ngOnInit() {
    this.partiesCfg = this.sejmometrCfg.politicalPartiesClubsData;

    this.sejmometrService.getDeputiesIndexedByPP().subscribe(data => {
      this.parties = data;
    });

    this.sejmometrService.getMostExpensiveDeputies().subscribe(mostExpensiveDeputies => {
      this.mostExpensiveDeputies = mostExpensiveDeputies.slice(0, 5);
    });

    this.sejmometrService.getMostExpensivePP().subscribe(mostExpensivePP => {
      console.log(mostExpensivePP);
    });
  }
}
