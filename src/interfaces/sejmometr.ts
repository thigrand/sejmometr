import {DeputyRow, SingleDeputyDataHttpResponse} from './deputies';

export interface DeputyExpenseArrayItem {
  deputy_id: string;
  name: string;
  club_id: string;
  club_name: string;
  spent: string;
  deputyData: DeputyRow;
}
export interface DeputiesSortedByPPRow {
  club_id: number;
  club_name: string;
  deputies: SingleDeputyDataHttpResponse;
}
