import { Component, OnInit } from '@angular/core';

import { SejmometrService } from '../../../providers/sejmometr';
import { ChartHelperService } from '../../services/chart-helper.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  public allDeputies: Array<any> = [];

  public chartLabels:string[] = [];
  public chartData:number[] = [];
  public chartType:string = 'pie';
  public chartLegend:boolean = true;

  public mostExpensiveDeputies:Array<any> = [];

  constructor(private sejmometrService: SejmometrService, private chartHelperService: ChartHelperService) { }
  // // events
  // public chartClicked(e:any):void {
  //   console.log(e);
  // }

  getLabelsForChartBy(array, key){
    this.chartLabels = array.map((element)=>{
      return element[key];
    });
  }
  getDataForChart(array, key){
    this.chartData = array.map((element)=>{
      return parseFloat(element[key]);
    });
  }
  onChange($event) {
    if($event === 'attendance_per_deputy'){
      this.chartType = 'bar';
    } else{
      this.chartType = 'pie';
    }
    this.getDataForChart(this.allDeputies, $event);
  }
  ngOnInit() {
    this.sejmometrService.getSubject('deputiesIndexedByPP').subscribe(allDeputiesInParties => {
      this.allDeputies = allDeputiesInParties.map((party)=>{
        return this.chartHelperService.makeObjectForChart(party);
      });
      this.getLabelsForChartBy(this.allDeputies, 'club_name');
      this.getDataForChart(this.allDeputies, 'expenses_per_deputy');
      console.log(this.allDeputies);
    });
  }

}
