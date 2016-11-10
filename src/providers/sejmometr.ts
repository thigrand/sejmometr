import {Injectable} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {
  DeputyDataHttpResponse,
  SingleDeputyDataHttpResponse
} from '../interfaces/';
import {DeputiesService} from './deputies';
import {SejmometrCfg} from '../cfg/';

@Injectable()
/**
 * Class used to operate on deputies/parliament speeches/parliament sessions data.
 * @class SejmometrService
 */
export class SejmometrService {
  private deputyExpensesArr: Array<string> = [
    'poslowie.wartosc_biuro_biuro',
    'poslowie.wartosc_biuro_ekspertyzy',
    'poslowie.wartosc_biuro_inne',
    'poslowie.wartosc_biuro_materialy_biurowe',
    'poslowie.wartosc_biuro_podroze_pracownikow',
    'poslowie.wartosc_biuro_przejazdy',
    'poslowie.wartosc_biuro_spotkania',
    'poslowie.wartosc_biuro_srodki_trwale',
    'poslowie.wartosc_biuro_taksowki',
    'poslowie.wartosc_biuro_telekomunikacja',
    'poslowie.wartosc_biuro_wynagrodzenia_pracownikow',
    'poslowie.wartosc_biuro_zlecenia',
    'poslowie.wartosc_refundacja_kwater_pln',
    'poslowie.wartosc_uposazenia_pln',
    'poslowie.wartosc_wyjazdow'
  ];
  private subscriptions: Array<Subscription> = [];
  public deputiesHttpResponse: Observable<DeputyDataHttpResponse>;
  public allDeputies: Array<SingleDeputyDataHttpResponse>;
  public deputiesIndexedByPP: Subject<Array<Array<SingleDeputyDataHttpResponse>>> = new Subject<Array<Array<SingleDeputyDataHttpResponse>>>();
  public mostExpensiveDeputies: Subject<Array<any>> = new Subject<Array<any>>();
  /**
   * @constructor
   * @param deputiesService DeputiesService provider
   * @param sejmometrCfg Global Sejmometr cfg object
   */
  constructor(
    private deputiesService: DeputiesService,
    private sejmometrCfg: SejmometrCfg
  ) {
    this.loadDeputiesHttpResponse();
  }
  /**
   * Get arrays of Deputies indexed by their club_name.
   * res[club_name] = array(Deputies).
   * @public
   * @returns Subject<Array<Array<SingleDeputyDataHttpResponse>>>
   */
  public getDeputiesIndexedByPP(): Subject<Array<Array<SingleDeputyDataHttpResponse>>> {
    this.ascertainDeputiesAvailable();
    return this.deputiesIndexedByPP;
  }
  /**
   * Get deputies filtered by club.
   * @param club_id Id of the club you want to get deputies from
   * @public
   * @returns Observable<DeputyDataHttpResponse>
   */
  public getDeputiesByPP(club_id: string): Observable<DeputyDataHttpResponse> {
    let conditions = [];
    conditions['poslowie.kadencja'] = [this.sejmometrCfg.currentCandence];
    conditions['poslowie.klub_id'] = [club_id];
    return this.deputiesService.getDataFiltered({
      conditions,
      limit: '500'
    });
  }
  public getTopSpendingDeputies(): Subject<Array<any>> {
    this.ascertainDeputiesAvailable();
    return this.mostExpensiveDeputies;
  }
  /**
   * Check if deputies data available.
   * @param isReset Set to true to force Deputies data reset.
   * @private
   */
  private ascertainDeputiesAvailable(isReset: boolean = false) {
    if (!this.allDeputies || isReset === true) {
      this.resetArrays();
      this.subscriptions['deputiesHttpResponse'] = this.deputiesHttpResponse.subscribe(deputyData => {
        this.allDeputies = deputyData.Dataobject.filter(singleDeputy => {
          return singleDeputy.data['poslowie.mandat_wygasl']  === '0';
        });
        this.refreshDeputiesIndexedByPP();
        this.refreshMostExpensiveDeputies(5);
      });
    }
  }
  /**
   * Empty all deputies data.
   * @private
   */
  private resetArrays() {
    this.allDeputies = [];
    this.deputiesIndexedByPP.next([]);
    this.mostExpensiveDeputies.next([]);
    if (this.subscriptions['deputiesHttpResponse']) {
      this.subscriptions['deputiesHttpResponse'].unsubscribe();
    }
  }
  /**
   * Reindex allDeputies data by club_name and save it to deputiesIndexedByPP.
   * @private
   */
  private refreshDeputiesIndexedByPP() {
    let res = [];
    this.allDeputies.forEach(singleDeputy => {
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
    this.deputiesIndexedByPP.next(
      res
    );
  }

  private refreshMostExpensiveDeputies(howManyDeputies: number) {
    let deputies = this.allDeputies.slice();
    deputies.sort((valA: SingleDeputyDataHttpResponse, valB: SingleDeputyDataHttpResponse) => {
      return (this.sumDeputyExpenses(valB) - this.sumDeputyExpenses(valA));
    });

    let topSpending = deputies.slice(0, howManyDeputies);
    let res = topSpending.map(deputy => {
      return {
        name: deputy.data['ludzie.nazwa'],
        club_id: deputy.data['sejm_kluby.id'],
        club_name: deputy.data['sejm_kluby.nazwa'],
        spent: this.sumDeputyExpenses(deputy).toFixed(2)
      };
    });
    this.mostExpensiveDeputies.next(res);
  }
  /**
   * Init deputiesHttpResponse Observable (subscribe to it to get all deputies from current cadence)
   * @private
   */
  private loadDeputiesHttpResponse() {
    let conditions = [];
    conditions['poslowie.kadencja'] = [this.sejmometrCfg.currentCandence];
    this.deputiesHttpResponse = this.deputiesService.getDataFiltered({
      conditions,
      limit: '500'
    });
  }
  private sumDeputyExpenses(deputy: SingleDeputyDataHttpResponse): number {
    let res = 0;
    this.deputyExpensesArr.forEach(expenseIndex => {
      if (!isNaN(parseFloat(deputy.data[expenseIndex])) && isFinite(deputy.data[expenseIndex])) {
        res += deputy.data[expenseIndex];
      }
    });
    return res;
  }
}
