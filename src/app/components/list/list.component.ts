import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription} from 'rxjs';
import * as _ from 'lodash';
import { DeputyExpenseArrayItem } from '../../interfaces';
import {
  SejmometrService,
  UtilitiesService
} from '../../services';

interface FilterInterface {
  'poslowie.nazwa_odwrocona'?: string;
  'sejm_kluby.nazwa'?: string;
  'poslowie.zawod'?: string;
  'poslowie.frekwencja'?: number;
  'poslowie.zbuntowanie'?: number;
  'poslowie.liczba_wypowiedzi'?: number;
  'poslowie.liczba_wnioskow'?: number;
  'spent'?: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = [];
  private deputiesListAll: Array<DeputyExpenseArrayItem>;
  deputiesListFiltered: BehaviorSubject<Array<DeputyExpenseArrayItem>> = new BehaviorSubject([]);

  orderByColumn: BehaviorSubject<string> = new BehaviorSubject('poslowie.nazwa_odwrocona');
  sortDirection: BehaviorSubject<'asc'|'desc'> = new BehaviorSubject<'asc'|'desc'>('asc');
  filterBy: BehaviorSubject<FilterInterface> = new BehaviorSubject<FilterInterface>({});

  constructor(
    private sejmometrService: SejmometrService,
    private utilitiesService: UtilitiesService
  ) {}

  ngOnInit() {
    this.subscriptions.push(this.sejmometrService.getMostExpensiveDeputies().subscribe(deputies => {
      this.deputiesListAll = deputies;
      this.refreshSortFunction();
    }));

    this.subscriptions.push(this.orderByColumn.subscribe(() => this.refreshSortFunction()));
    this.subscriptions.push(this.sortDirection.subscribe(() => this.refreshSortFunction()));
    this.subscriptions.push(this.filterBy.subscribe(() => this.refreshSortFunction()));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  changeSorting(sortKey) {
    if (this.orderByColumn.getValue() === sortKey) {
      this.sortDirection.next(this.sortDirection.getValue() === 'asc' ? 'desc' : 'asc');
    } else {
      this.orderByColumn.next(sortKey);
    }
  }

  isOrderedBy = sortKey => this.orderByColumn.getValue() === sortKey;
  isOrderedReverse = () => this.sortDirection.getValue() === 'asc';

  filterDeputiesBy(filterVar, $event: Event) {
    let filters = this.filterBy.getValue();
    let value = $event.target['value'];

    if (value === '') {
      delete filters[filterVar];
      this.filterBy.next(filters);
    } else if (filters[filterVar] !== value) {
      filters[filterVar] = value;
      this.filterBy.next(filters);
    }
  }

  private refreshSortFunction() {
    let order = this.orderByColumn.getValue();
    let valueFn = (item: DeputyExpenseArrayItem) => {
      let init_val = order === 'spent' ? parseFloat(item.spent) : item.deputyData[order];
      return this.utilitiesService.isNumber(init_val) ? init_val : this.utilitiesService.replaceNationalChars(init_val);
    };
    let filterFn = (item: DeputyExpenseArrayItem) => {
      let result = true;
      _.forOwn(this.filterBy.getValue(), (fVal, fIndex) => {
        if (!_.includes(_.lowerCase(item.deputyData[fIndex]), _.lowerCase(fVal))) {
          result = false;
        }
      });
      return result;
    };
    let deputiesFiltered = _.filter(this.deputiesListAll, filterFn);
    this.deputiesListFiltered.next(_.orderBy(deputiesFiltered, valueFn, [this.sortDirection.getValue()]));
  }
}

