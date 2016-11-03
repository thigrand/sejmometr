import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {DeputyDataHttpResponse} from '../interfaces/';
import {DeputiesService} from './deputies';
import {SingleDeputyDataHttpResponse} from '../interfaces/deputies';
import * as _ from 'lodash';

@Injectable()
/**
 * Class used to operate on deputies/parliament speeches/parliament sessions data.
 * @class SejmometrService
 */
export class SejmometrService {
  public allDeputies: Array<SingleDeputyDataHttpResponse>;
  private actualCandence: string = '8';
  public deputiesIndexedByPP: Subject<Array<SingleDeputyDataHttpResponse>> = new Subject<Array<SingleDeputyDataHttpResponse>>();
  private deputiesHttpResponse: Observable<DeputyDataHttpResponse>;
  /**
   * @constructor
   * @param deputiesService DeputiesService provider
   */
  constructor(
    private deputiesService: DeputiesService
  ) {
    let conditions = [];
    conditions['poslowie.kadencja'] = [this.actualCandence];
    this.deputiesHttpResponse = this.deputiesService.getDataFiltered({
      conditions,
      limit: '500'
    });

  }
  refreshDeputiesIndexedByPoliticalParty() {
    this.deputiesHttpResponse.subscribe(deputyData => {
      this.allDeputies = deputyData.Dataobject;

      let res = [];
      this.allDeputies.forEach(singleDeputy => {
        if (!res[singleDeputy.data['sejm_kluby.nazwa']]) {
          res[singleDeputy.data['sejm_kluby.nazwa']] = [];
        }
        // res[singleDeputy.data['poslowie.klub_id']].push(singleDeputy);
        res[singleDeputy.data['sejm_kluby.nazwa']].push(singleDeputy);
      });
      this.deputiesIndexedByPP.next(
        res
      );
      console.log(this.deputiesIndexedByPP);
    });
  }
}
