import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpService} from "../../providers/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  constructor(
    public navCtrl: NavController,
    private httpService: HttpService
  ) {
  }

  ngOnInit(){
    // this.httpService.getResources('poslowie.json?limit=500&page=1')
    //   .subscribe(poslowie => {
    //     poslowie['Dataobject'].forEach(posel => {
    //       this.httpService.getResources(`poslowie/${posel.id}.json?layers[]=biura`)
    //         .subscribe(poselDetails => {
    //           if(poselDetails.layers.biura && poselDetails.layers.biura.length>0){
    //             console.log(poselDetails);
    //           }
    //         });
    //     })
    //   });
  }
}
