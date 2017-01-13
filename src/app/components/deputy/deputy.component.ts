import { Component, OnInit } from '@angular/core';
import { DeputiesService } from '../../services/deputies.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Const } from '../../commons/constants';

@Component({
  selector: 'app-deputy',
  templateUrl: './deputy.component.html',
  styleUrls: ['./deputy.component.scss']
})
export class DeputyComponent implements OnInit  {
  public deputyDetails: any = {};
  public Const = Const;
  constructor(private deputiesService: DeputiesService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params['id']) {
        this.deputiesService.getSingleData( parseInt(params['id'], 10) ).subscribe(deputy => {
          this.deputyDetails = deputy.data;
          console.log(this.deputyDetails);
        });
      }
    });
  }
}
