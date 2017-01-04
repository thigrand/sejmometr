import { Component, OnInit } from '@angular/core';
import {
  SejmometrService,
  ChartHelperService
} from '../../services/';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  allDeputies: Array<any> = [];

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
        return this.chartHelperService.makeObjectForChart(party);
      });
      this.getLabelsForChartBy(this.allDeputies, 'club_name');
      this.getDataForChart(this.allDeputies, 'expenses_per_deputy');
    });
  }

  getLabelsForChartBy(array, key) {
    this.chartLabels = array.map((element) => {
      return element[key] === '' ? 'Niezrzeszeni' : element[key];
    });
  }

  getDataForChart(array, key) {
    this.chartData = array.map((element) => {
      return parseFloat(element[key]);
    });
  }

  onChange($event, labels) {
    console.log($event, labels);
    this.chartType = $event === 'attendance_per_deputy' ? 'bar' : 'pie';
    this.getDataForChart(this.allDeputies, $event);
  }
}
