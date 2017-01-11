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

  constructor(
    private sejmometrService: SejmometrService,
    private chartHelperService: ChartHelperService
  ) {}

  ngOnInit() {
    this.sejmometrService.getDeputiesIndexedByPP().subscribe(allDeputiesInParties => {
      this.allDeputies = allDeputiesInParties.map((party) => {
        return this.chartHelperService.makeObjectForChartParty(party);
      });
      this.getLabelsForChartBy(this.allDeputies, 'club_name', 'parties');
      this.getDataForChart(this.allDeputies, 'expenses_per_deputy', 'parties');
    });

    this.sejmometrService.getMostExpensiveDeputies().subscribe(allDeputies => {
      this.topDeputies = this.chartHelperService.makeObjectForChartDeputies(allDeputies);
      // console.log('top deputies', this.topDeputies);
    });
  }

  getLabelsForChartBy(array, key, labels) {
    if (labels === 'parties') {
      this.chartLabels = array.map((element) => {
        return element[key] === '' ? 'Niezrzeszeni' : element[key];
      });
    } else {
      this.chartLabels = array;
    }
  }

  getDataForChart(array, key, labels) {
    if (labels === 'parties') {
      this.chartData = _.map(array, (element) => {
        return parseFloat(element[key]);
      });
    } else {
      this.chartData = array['data'];
    }
  }

  onChange($event, labels) {
    // this.chartType = ($event === 'attendance_per_deputy') ? 'bar' : 'pie';
    if (labels === 'parties') {
      this.getLabelsForChartBy(this.allDeputies, 'club_name', labels);
      this.getDataForChart(this.allDeputies, $event, labels);
    } else {
      this.getLabelsForChartBy(this.topDeputies[$event].labels, 'name', labels);
      this.getDataForChart(this.topDeputies[$event], $event, labels);
    }
  }
}
