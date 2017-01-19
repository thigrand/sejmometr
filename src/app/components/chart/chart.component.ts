import { Component, OnInit } from '@angular/core';
import {
  SejmometrService,
  ChartHelperService,
  LoaderService
} from '../../services/';
import {Router} from '@angular/router';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  allDeputies: Array<any> = [];
  topDeputies: any = {};
  chartTab: string = 'parties';
  chartSelect: string = 'expenses';

  chartLabels: Array<string> = [];
  chartData: Array<number> = [];
  chartType: string = 'pie';

  constructor(
    private sejmometrService: SejmometrService,
    private chartHelperService: ChartHelperService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loaderService.displayLoader();
    this.sejmometrService.getDeputiesIndexedByPP().subscribe(allDeputiesInParties => {
      this.allDeputies = allDeputiesInParties.map((party) => {
        return this.chartHelperService.makeObjectForChartParty(party);
      });
      this.chartLabels = this.chartHelperService.getLabelsForChartBy(this.allDeputies, 'club_name', 'parties');
      this.chartData = this.chartHelperService.getDataForChart(this.allDeputies, 'expenses_per_deputy', 'parties');
    });

    this.sejmometrService.getMostExpensiveDeputies().subscribe(allDeputies => {
      this.topDeputies = this.chartHelperService.makeObjectForChartDeputies(allDeputies);
      this.loaderService.hideLoader();
    });
  }
  onChange($event, labels) {
    console.log(this, $event, labels, this.topDeputies[$event]);
    // this.chartType = ($event === 'attendance_per_deputy') ? 'bar' : 'pie';
    this.chartTab = labels;
    this.chartSelect = $event;
    if (labels === 'parties') {
      this.chartLabels = this.chartHelperService.getLabelsForChartBy(this.allDeputies, 'club_name', labels);
      this.chartData = this.chartHelperService.getDataForChart(this.allDeputies, $event, labels);
    } else {
      if ( this.topDeputies[$event] !== undefined ) {
        this.chartLabels = this.chartHelperService.getLabelsForChartBy(this.topDeputies[$event].labels, 'name', labels);
        this.chartData = this.chartHelperService.getDataForChart(this.topDeputies[$event], $event, labels);
      }
    }
  }

  public chartClicked(e: any): void {
    // console.log(e, e.active[0]);
    if (e.active.length) {
      let index = e.active[0]._index;
      let demandedDeputyId = (this.chartTab === 'deputies') ? this.topDeputies[this.chartSelect].ids[index] : -1;
      let demandedPartyId = (this.chartTab === 'parties') ? this.allDeputies[index].club_id : -1;
      if (this.chartTab === 'deputies') {
        this.router.navigate(['/deputy/' + demandedDeputyId]);
      } else {
        this.router.navigate(['/browser/' + demandedPartyId]);
      }
    }
  }
}
