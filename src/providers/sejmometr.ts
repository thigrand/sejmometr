import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
  SingleDeputyDataHttpResponse,
  DeputyExpenseArrayItem,
  DeputiesSortedByPPRow,
  DeputyDataApiResponse
} from '../interfaces/';
import {SejmometrCfg} from '../cfg/';
import {UtilitiesService} from './utilities';
import {DeputiesService} from './deputies';

@Injectable()
/**
 * Class used to operate on deputies/parliament speeches/parliament sessions data.
 * @class SejmometrService
 */
export class SejmometrService {
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
      return deputyData.Dataobject.filter(singleDeputy => {
        return singleDeputy.data['poslowie.mandat_wygasl']  === '0';
      });
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

      res.sort((itemA, itemB) => {
        return itemB.deputies.length - itemA.deputies.length;
      });

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
      return deputies.sort((valA: SingleDeputyDataHttpResponse, valB: SingleDeputyDataHttpResponse) => {
        return (this.sumDeputyExpenses(valB) - this.sumDeputyExpenses(valA));
      }).map(deputy => {
        return {
          deputy_id: deputy.data['ludzie.id'],
          name: deputy.data['ludzie.nazwa'],
          club_id: deputy.data['sejm_kluby.id'],
          club_name: deputy.data['sejm_kluby.nazwa'],
          spent: this.sumDeputyExpenses(deputy).toFixed(2),
          deputyData: deputy.data
        };
      });
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
}
