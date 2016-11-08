import {Component, OnInit} from '@angular/core';
import {SejmometrService} from '../../../providers/';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage implements OnInit {
  private parties = [];
  constructor(
    private sejmometrService: SejmometrService
  ) {}

  ngOnInit() {
    this.sejmometrService.getDeputiesIndexedByPP().subscribe(data => {
      this.parties = data;
      console.log(this.parties);
    });
  }
}
