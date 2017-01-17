import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as _ from 'lodash';
import { SejmometrCfg } from '../../../cfg/SejmometrCfg';
import { DeputyExpenseArrayItem } from '../../interfaces';
import {
  UtilitiesService,
  SejmometrService
} from '../../services';

interface FilterObj {
  [index: string]: {
    value: any;
    isEnabled: boolean;
    isStrict: boolean;
    isNumber: boolean;
    direction?: 'asc'|'desc';
  };
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  politicalParties;
  subscriptions: Array<Subscription> = [];
  private deputiesListAll: Array<DeputyExpenseArrayItem>;
  deputiesListFiltered: BehaviorSubject<Array<DeputyExpenseArrayItem>> = new BehaviorSubject([]);

  orderByColumn: BehaviorSubject<string> = new BehaviorSubject('poslowie.nazwa_odwrocona');
  sortDirection: BehaviorSubject<'asc'|'desc'> = new BehaviorSubject<'asc'|'desc'>('asc');
  filterBy: BehaviorSubject<FilterObj> = new BehaviorSubject<FilterObj>({
    'poslowie.nazwa_odwrocona': {
      value: '',
      isEnabled: false,
      isStrict: false,
      isNumber: false
    },
    'poslowie.klub_id': {
      value: '',
      isEnabled: false,
      isStrict: true,
      isNumber: false
    },
    'poslowie.zawod': {
      value: '',
      isEnabled: false,
      isStrict: false,
      isNumber: false
    },
    'poslowie.frekwencja': {
      value: 0,
      isEnabled: false,
      isStrict: false,
      isNumber: true,
      direction: 'asc'
    },
    'poslowie.zbuntowanie': {
      value: 0,
      isEnabled: false,
      isStrict: false,
      isNumber: true,
      direction: 'asc'
    },
    'poslowie.liczba_wypowiedzi': {
      value: 0,
      isEnabled: false,
      isStrict: false,
      isNumber: true,
      direction: 'asc'
    },
    'poslowie.liczba_wnioskow': {
      value: 0,
      isEnabled: false,
      isStrict: false,
      isNumber: true,
      direction: 'asc'
    },
    'spent': {
      value: '',
      isEnabled: false,
      isStrict: false,
      isNumber: true
    },
    'poslowie.plec': {
      value: '',
      isEnabled: false,
      isStrict: true,
      isNumber: false
    }
  });

  constructor(
    private sejmometrService: SejmometrService,
    private utilitiesService: UtilitiesService,
    private route: ActivatedRoute,
    private sejmometrCfg: SejmometrCfg
  ) {
    this.politicalParties = _.values(_.omit(this.sejmometrCfg.politicalPartiesClubsData, 'BRAK'));
  }

  ngOnInit() {
    this.subscriptions.push(this.sejmometrService.getMostExpensiveDeputies().subscribe(deputies => {
      this.deputiesListAll = deputies;
      this.refreshSortFunction();
    }));
    this.subscriptions.push(this.route.params.subscribe(params => {
      if (params['id']) {
        this.filterDeputiesBy('poslowie.klub_id', params['id']);
      }
    }));
    // this.subscriptions.push(Observable.concat(this.orderByColumn, this.sortDirection, this.filterBy)
    //   .subscribe(() => this.refreshSortFunction()));
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

  filterDeputiesBy(filterVar, val) {
    let filters = this.filterBy.getValue();
    let value = typeof(val['value']) !== 'undefined' ? val['value'] : val;

    filters[filterVar].value = value;
    if (value === '') {
      filters[filterVar].isEnabled = false;
      this.filterBy.next(filters);
    } else if (filters[filterVar] !== value) {
      filters[filterVar].isEnabled = true;
      this.filterBy.next(filters);
    }
  }

  resetFilters(...Inputs) {
    let filterObj = this.filterBy.getValue();
    this.filterBy.next(_.forOwn(filterObj, (item) => {
      item.isEnabled = false;
    }));
    Inputs.forEach(singleInput => {
      singleInput.value = '';
    });
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
        if (fVal.isEnabled === true) {
          if (fVal.isStrict) {
            if (item.deputyData[fIndex] !== fVal.value) {
              result = false;
            }
          } else {
            if (!_.includes(_.lowerCase(item.deputyData[fIndex]), _.lowerCase(fVal.value))) {
              result = false;
            }
          }
        }
      });
      return result;
    };
    let deputiesFiltered = _.filter(this.deputiesListAll, filterFn);
    this.deputiesListFiltered.next(_.orderBy(deputiesFiltered, valueFn, [this.sortDirection.getValue()]));
  }
}
