import { Component, OnInit } from '@angular/core';

import { SejmometrService } from '../../../providers/sejmometr';


// import { BaseChartDirective } from 'ng2-charts/ng2-charts';
// import { ChartsModule } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  public chartLabels:string[] = [];
  public chartData:number[] = [];
  public chartType:string = 'pie';
  public chartLegend:boolean = false;

  public mostExpensiveDeputies:Array<any> = [];
  constructor(private sejmometrService: SejmometrService) { }


  // // events
  // public chartClicked(e:any):void {
  //   console.log(e);
  // }
  //
  // public chartHovered(e:any):void {
  //   console.log(e);
  // }
  getLabelsForChartBy(array, key){
    this.chartLabels = array.map((element)=>{
      return element[key];
    });
    // this.chartLabels.push('zero')
  }
  getDataForChart(array, key){
    this.chartData = array.map((element)=>{
      return parseFloat(element[key]);
    });
    // this.chartData.push(0)
  }

  getMostExpensiveDeputies(allDeputies){
    let greeders = allDeputies.slice(0, 5);
    console.log('greeders', greeders);
    this.getLabelsForChartBy(greeders, 'name');
    this.getDataForChart(greeders, 'spent');
    return greeders;
  }

  ngOnInit() {
    this.sejmometrService.getSubject('mostExpensiveDeputies').subscribe(allDeputies => {
      this.mostExpensiveDeputies = this.getMostExpensiveDeputies(allDeputies);
      console.log("chart data", allDeputies)
    });
    //todo: Dodać id posła do obiektu ktory tutaj sie sciaga.
  }

}
