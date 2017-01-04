import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  SingleDeputyDataHttpResponse,
  DeputyExpenseArrayItem,
  DeputiesSortedByPPRow,
  DeputyDataApiResponse,
  PPexpense
} from '../interfaces';
import { SejmometrCfg } from '../../cfg';
import { UtilitiesService } from './utilities.service';
import { DeputiesService } from './deputies.service';

@Injectable()
/**
 * Class used to operate on deputies/parliament speeches/parliament sessions data.
 * @class SejmometrService
 */
export class SejmometrService {
  /**
   * All sorting functions used in this service
   */
  private sortBy = {
    deputiesL: (deputiesA, deputiesB) => {
      return deputiesB.deputies.length - deputiesA.deputies.length;
    },
    deputiesExpensesSum: (deputyA: DeputyExpenseArrayItem, deputyB: DeputyExpenseArrayItem) => {
      return parseFloat(deputyB.spent) - parseFloat(deputyA.spent);
    }
  };
  /**
   * All filter functions used in this service
   */
  private filters = {
    deputiesOutdatedTicket: singleDeputy => {
      return singleDeputy.data['poslowie.mandat_wygasl']  === '0';
    }
  };
  /**
   * @constructor
   * @param deputiesService DeputiesService provider
   * @param sejmometrCfg Global Sejmometr cfg object
   * @param utilitiesService Service with many misc features.
   */
  constructor(
    private deputiesService: DeputiesService,
    private sejmometrCfg: SejmometrCfg,
    private utilitiesService: UtilitiesService
  ) {}
  /**
   * Get allDeputies data (exclude deputies with outdated ticket).
   * @returns Observable
   */
  getAllDeputies(): Observable<Array<SingleDeputyDataHttpResponse>> {
    return this.getDeputiesHttpResponse().map(deputyData => {
      return deputyData.Dataobject.filter(this.filters.deputiesOutdatedTicket);
    });
  }
  /**
   * Get allDeputies data and reindex it by club_name.
   * @returns Observable
   */
  getDeputiesIndexedByPP(): Observable<Array<DeputiesSortedByPPRow>> {
    return this.getAllDeputies().map(deputies => {
      let res = [];

      deputies.forEach(singleDeputy => {
        if (singleDeputy.data['sejm_kluby.id'] === '') {
          singleDeputy.data['sejm_kluby.id'] = '7';
          singleDeputy.data['poslowie.klub_id'] = '7';
        }
        let index = res.map(function(obj, index) {
          if (obj.club_id === singleDeputy.data['sejm_kluby.id']) {
            return index;
          }
        }).filter(isFinite);
        if (index.length === 0) {
          res.push({
            club_id: singleDeputy.data['sejm_kluby.id'],
            club_name: singleDeputy.data['sejm_kluby.nazwa'],
            deputies: [singleDeputy]
          });
        } else {
          res[index[0]].deputies.push(singleDeputy);
        }
      });

      res.sort(this.sortBy.deputiesL);

      return res;
    });
  }
  /**
   * Get list of most spending deputies
   * @returns Observable
   */
  getMostExpensiveDeputies(): Observable<Array<DeputyExpenseArrayItem>> {
    return this.getAllDeputies().map(allDeputies => {
      let deputies = allDeputies.slice();
      return deputies.map(deputy => {
        if (deputy.data['sejm_kluby.id'] === '') {
          deputy.data['sejm_kluby.id'] = '7';
          deputy.data['poslowie.klub_id'] = '7';
        }
        return {
          deputy_id: deputy.data['ludzie.id'],
          name: deputy.data['ludzie.nazwa'],
          club_id: deputy.data['sejm_kluby.id'],
          club_name: deputy.data['sejm_kluby.nazwa'],
          spent: this.sumDeputyExpenses(deputy).toFixed(2),
          deputyData: deputy.data
        };
      }).sort(this.sortBy.deputiesExpensesSum);
    });
  }
  /**
   * Get list of most spending PP
   * @returns Observable
   */
  getMostExpensivePP(): Observable<Array<PPexpense>> {
    return this.getDeputiesIndexedByPP().map(parties => {
      return parties.map(singleParty => this.sumPPExpenses(singleParty));
    });
  }
  /**
   * Get list of most frequent PP
   * @returns Observable
   */
  getMostFrequentPP() {
    return this.getDeputiesIndexedByPP().map(parties => {
      return parties.map(singleParty => this.sumPPFrequency(singleParty));
    });
  }
  /**
   * Make request to get all deputies data.
   * @private
   * @returns Observable
   */
  private getDeputiesHttpResponse(): Observable<DeputyDataApiResponse> {
    return this.deputiesService.getDataFiltered({
      conditions: {
        'poslowie.kadencja' : this.sejmometrCfg.currentCandence
      },
      limit: '500'
    });
  }
  /**
   * Sum all deputy expenses.
   * @param deputy Single deputy http response data.
   * @private
   * @returns number
   */
  private sumDeputyExpenses(deputy: SingleDeputyDataHttpResponse): number {
    let res = 0;

    this.sejmometrCfg.deputyExpensesArr.forEach(expenseIndex => {
      if (this.utilitiesService.isNumber(deputy.data[expenseIndex])) {
        res += deputy.data[expenseIndex];
      }
    });

    return res;
  }
  /**
   * Sum all PP deputies expenses.
   * @param singleParty Single PP with all deputies.
   * @private
   * @returns number
   */
  private sumPPExpenses(singleParty: DeputiesSortedByPPRow): PPexpense {
    return {
      club_id: singleParty.club_id,
      club_name: singleParty.club_name,
      expenses: singleParty.deputies.reduce((prevV, nextV) => {
        return (parseFloat(prevV) + this.sumDeputyExpenses(nextV)).toFixed(2);
      }, '0')
    };
  }
  private sumPPFrequency(singleParty: DeputiesSortedByPPRow) {
    let sumFreq = singleParty.deputies.reduce((prevV, nextV) => {
      return prevV + nextV.data['poslowie.frekwencja'];
    }, 0);

    return {
      club_id: singleParty.club_id,
      club_name: singleParty.club_name,
      frequency: sumFreq / singleParty.deputies.length
    };
  }
}
