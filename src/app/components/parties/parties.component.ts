import { Component, OnInit } from '@angular/core';
import {SejmometrService} from '../../../providers/sejmometr';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.scss']
})
export class PartiesComponent implements OnInit {

  constructor(private sejmometrService: SejmometrService) { }


  filterActiveDeputies(data){
    return data.filter((el) => {
      return el.data['poslowie.mandat_wygasl'] === '0';
    });
  }
  ngOnInit() {

    this.sejmometrService.getDeputiesIndexedByPP().subscribe(data => {
      console.log(this.filterActiveDeputies(data['Prawo i Sprawiedliwość']).length);
      console.log(data, typeof data)
      let filteredParties = [];
      for(let party in data){
        filteredParties.push(this.filterActiveDeputies(data[party]))
      }
      console.log(filteredParties);

    });
  }

}
