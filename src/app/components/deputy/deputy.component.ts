import { Component, OnInit } from '@angular/core';
// import { DeputiesService } from '../../services/deputies.service';
import {
  DeputiesService,
  LoaderService
} from '../../services/';
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
              private route: ActivatedRoute,
              private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.displayLoader();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.deputiesService.getSingleData( parseInt(params['id'], 10) ).subscribe(deputy => {
          this.deputyDetails = deputy.data;
          console.log(this.deputyDetails);
          this.loaderService.hideLoader();
        });
      } else {
        this.loaderService.hideLoader();
      }
    });
  }
}
