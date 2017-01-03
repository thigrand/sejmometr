import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import {
  SejmometrService,
  UtilitiesService
} from '../../services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})

export class ListComponent implements OnInit {
  private subscriptions: Array<Subscription> = [];
  deputiesList: Array<any>;
  orderByColumn: string;
  sortDirection: 'asc'|'desc' = 'asc';

  constructor(
    private sejmometrService: SejmometrService,
    private utilitiesService: UtilitiesService
  ) {}

  ngOnInit() {
    this.getDeputies();
  }

  getDeputies() {
    this.subscriptions.push(this.sejmometrService.getMostExpensiveDeputies().subscribe(
      deputiesList => {
        this.deputiesList = deputiesList;
        this.changeSorting('poslowie.nazwa_odwrocona');
      }
    ));
  }

  changeSorting(sortKey) {
    if (this.orderByColumn === sortKey) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }

    this.orderByColumn = sortKey;
    this.deputiesList = _.orderBy(
      this.deputiesList,
      (item) => sortKey === 'spent' ? item.spent : this.utilitiesService.replaceNationalChars(item.deputyData[sortKey]),
      [this.sortDirection]
    );
  }

  isOrderedBy = sortKey => this.orderByColumn === sortKey;
  isOrderedReverse = () => this.sortDirection === 'asc';
}

