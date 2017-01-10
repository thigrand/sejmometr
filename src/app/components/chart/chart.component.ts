import { Component, OnInit } from '@angular/core';
import {
  SejmometrService,
  ChartHelperService
} from '../../services/';
import * as _ from 'lodash';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  allDeputies: Array<any> = [];
  topDeputies: any = {};

  chartLabels: Array<string> = [];
  chartData: Array<number> = [];
  chartType: string = 'pie';
  chartLegend: boolean = true;

  mostExpensiveDeputies: Array<any> = [];

  constructor(
    private sejmometrService: SejmometrService,
    private chartHelperService: ChartHelperService
  ) {}

  ngOnInit() {
    this.sejmometrService.getDeputiesIndexedByPP().subscribe(allDeputiesInParties => {
      this.allDeputies = allDeputiesInParties.map((party) => {
        return this.chartHelperService.makeObjectForChartParty(party);
      });
      this.getLabelsForChartBy(this.allDeputies, 'club_name');
      this.getDataForChart(this.allDeputies, 'expenses_per_deputy', 'parties');
    });

    this.sejmometrService.getMostExpensiveDeputies().subscribe(allDeputies => {
      this.topDeputies = this.chartHelperService.makeObjectForChartDeputies(allDeputies);
      console.log('top deputies', this.topDeputies);
    });

  }

  getLabelsForChartBy(array, key) {
    this.chartLabels = array.map((element) => {
      return element[key] === '' ? 'Niezrzeszeni' : element[key];
    });
  }

  getDataForChart(array, key, labels) {
    console.log('getDataForChart', array, this.chartData, labels);
    if (labels === 'parties') {
      this.chartData = _.map(array, (element) => {
        return parseFloat(element[key]);
      });
    } else {
      // this.chartData = this.chartHelperService.prepareDataForChart(this.topDeputies);

    }


  }

  onChange($event, labels) {
    console.log($event, labels);
    // this.chartType = ($event === 'attendance_per_deputy') ? 'bar' : 'pie';
    if (labels === 'parties') {
      this.getLabelsForChartBy(this.allDeputies, 'club_name');
      this.getDataForChart(this.allDeputies, $event, labels);
    } else {
      // this.getLabelsForChartBy(this.topDeputies, 'name');
      this.getDataForChart(this.topDeputies, $event, labels);
    }
  }
}
