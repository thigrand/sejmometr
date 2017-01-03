import {Subject, Observable} from 'rxjs';
import {SingleDeputyDataHttpResponse, DeputyDataHttpResponse, DeputyRow} from './deputies';

export interface DeputyExpenseArrayItem {
  deputy_id: string;
  name: string;
  club_id: string;
  club_name: string;
  spent: number;
  deputyData: DeputyRow;
}

export interface SejmometrSubjectsObj {
  allDeputies: Subject<Array<SingleDeputyDataHttpResponse>>;
  deputiesHttpResponse: Observable<DeputyDataHttpResponse>;
  deputiesIndexedByPP: Subject<Array<Array<SingleDeputyDataHttpResponse>>>;
  mostExpensiveDeputies: Subject<Array<any>>;
}
