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
  private subscriptions: Array<Subscription> = [];
  private deputiesHttpResponse: Observable<DeputyDataHttpResponse>;

  public allDeputies: Array<SingleDeputyDataHttpResponse>;
  public deputiesIndexedByPP: Subject<Array<Array<SingleDeputyDataHttpResponse>>> = new Subject<Array<Array<SingleDeputyDataHttpResponse>>>();
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

  public getDeputiesIndexedByPP(): Subject<Array<Array<SingleDeputyDataHttpResponse>>> {
    this.ascertainDeputiesAvailable();
    return this.deputiesIndexedByPP;
  }

  public getDeputiesByPP(club_id: string): Observable<DeputyDataHttpResponse> {
    let conditions = [];
    conditions['poslowie.kadencja'] = [this.sejmometrCfg.actualCandence];
    conditions['poslowie.klub_id'] = [club_id];
    return this.deputiesService.getDataFiltered({
      conditions,
      limit: '500'
    });
  }

  private ascertainDeputiesAvailable(isReset: boolean = false) {
    if (!this.allDeputies || isReset === true) {
      this.resetArrays();
      this.subscriptions['deputiesHttpResponse'] = this.deputiesHttpResponse.subscribe(deputyData => {
        this.allDeputies = deputyData.Dataobject;
        this.refreshDeputiesIndexedByPP();
      });
    }
  }

  private resetArrays() {
    this.allDeputies = [];
    this.deputiesIndexedByPP.next([]);
    if (this.subscriptions['deputiesHttpResponse']) {
      this.subscriptions['deputiesHttpResponse'].unsubscribe();
    }
  }

  private refreshDeputiesIndexedByPP() {
    let res = [];
    this.allDeputies.forEach(singleDeputy => {
      if (!res[singleDeputy.data['sejm_kluby.nazwa']]) {
        res[singleDeputy.data['sejm_kluby.nazwa']] = [];
      }
      res[singleDeputy.data['sejm_kluby.nazwa']].push(singleDeputy);
    });
    this.deputiesIndexedByPP.next(
      res
    );
  }

  private loadDeputiesHttpResponse() {
    let conditions = [];
    conditions['poslowie.kadencja'] = [this.sejmometrCfg.actualCandence];
    this.deputiesHttpResponse = this.deputiesService.getDataFiltered({
      conditions,
      limit: '500'
    });
  }
}
