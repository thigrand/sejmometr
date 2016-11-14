import {Component, OnInit} from '@angular/core';
import {SejmometrService} from '../../../providers/sejmometr';
import {Subscription} from 'rxjs';
import * as _ from 'lodash';

const DIRECTION = {
  ASC: 'asc',
  DESC: 'desc'
};

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})

export class ListComponent implements OnInit {
  private subscriptions: Array<Subscription> = [];
  deputiesList: Array<any>;
  orderByColumn: string;
  sortDirection: string = DIRECTION.ASC;


  constructor(private sejmometrService: SejmometrService) {
  }

  ngOnInit() {
    this.getDeputies();

  }

  getDeputies() {
    this.subscriptions.push(this.sejmometrService.getSubject('deputiesHttpResponse')
      .subscribe(
        deputiesList => {
          this.deputiesList = deputiesList.Dataobject;
          this.changeSorting('ludzie.nazwa');
        }
      ));
  }

  changeSorting(sortKey) {

    if (this.orderByColumn === sortKey) {
      this.sortDirection = this.sortDirection === DIRECTION.ASC ? DIRECTION.DESC : DIRECTION.ASC;
    }

    this.orderByColumn = sortKey;
    this.deputiesList = _.orderBy(this.deputiesList, (item) => item.data[sortKey], [this.sortDirection]);
  }

  isOrderedBy = (sortKey) => this.orderByColumn === sortKey; //Dlaczego w formie literału?
  isOrderedReverse = () => this.sortDirection === 'asc' ? true : false;

}

