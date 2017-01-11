import { Component, OnInit } from '@angular/core';
import { SejmometrService } from '../../services/sejmometr.service';
import { SegregateDeputiesService } from '../../services/segregate-deputies.service';
import { Const } from '../../commons/constants';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit {
  private mostExpensive: Array<any>;
  private const = Const;
  constructor(
    private sejmometrService: SejmometrService,
    private segregateService: SegregateDeputiesService
  ) {}
  ngOnInit() {
    console.log(this.const.L_NAME);
    this.sejmometrService.getMostExpensiveDeputies().subscribe( (allDeputies) => {
      this.mostExpensive = this.segregateService.getTopExpenders(allDeputies);
      console.log(this.mostExpensive);
    });
  }
}
