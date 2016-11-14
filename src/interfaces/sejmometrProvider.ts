import {Subject, Observable} from 'rxjs';
import {SingleDeputyDataHttpResponse, DeputyDataHttpResponse} from './deputies';

export interface DeputyExpenseArrayItem{
  name: string;
  club_id: string;
  club_name: string;
  spent: number;
}

export interface SejmometrSubjectsObj {
  allDeputies: Subject<Array<SingleDeputyDataHttpResponse>>;
  deputiesHttpResponse: Observable<DeputyDataHttpResponse>;
  deputiesIndexedByPP: Subject<Array<Array<SingleDeputyDataHttpResponse>>>;
  mostExpensiveDeputies: Subject<Array<any>>;
}
