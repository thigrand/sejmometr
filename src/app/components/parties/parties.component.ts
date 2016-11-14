import { Component, OnInit} from '@angular/core';
import {SejmometrService} from '../../../providers/sejmometr';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.scss']
})
export class PartiesComponent implements OnInit {
  public parties: Array<any> = [];
  constructor(private sejmometrService: SejmometrService) {
  }

  prepareToView(object) {
    let partyObj = {
      club_name: object.club_name,
      amount: object.deputies.length,
      img: "false"
    };
    switch(object.club_name){
      case 'Prawo i Sprawiedliwość':
        partyObj.img = "pis.svg";
        break;
      case 'Platforma Obywatelska':
        partyObj.img = "po.png";
        break;
      case "Kukiz'15":
        partyObj.img = "kukiz.png";
        break;
      case 'Nowoczesna':
        partyObj.img = "nowoczesna.png";
        break;
      case 'Polskie Stronnictwo Ludowe':
        partyObj.img = "psl.png";
        break;
      default:
        partyObj.img = "niezrzeszeni.png";
        break;
    }
    this.parties.push(partyObj);
  }
  ngOnInit() {
    this.sejmometrService.getSubject('deputiesIndexedByPP').subscribe(data => {
      data.forEach((element)=> {this.prepareToView(element)});
      // console.log("parties data", data, this.parties)
    });
  }

}
