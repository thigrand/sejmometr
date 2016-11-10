import {Subject, Observable} from 'rxjs';
import {SingleDeputyDataHttpResponse, DeputyDataHttpResponse} from './deputies';

export interface SejmometrSubjectsObj {
  allDeputies: Subject<Array<SingleDeputyDataHttpResponse>>;
  deputiesHttpResponse: Observable<DeputyDataHttpResponse>;
  deputiesIndexedByPP: Subject<Array<Array<SingleDeputyDataHttpResponse>>>;
  mostExpensiveDeputies: Subject<Array<any>>;
}
