import { Injectable } from '@angular/core';
import { SegregateDeputiesService } from '../services/segregate-deputies.service';
import {Const} from '../commons/constants';

@Injectable()
export class ChartHelperService {
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
  constructor(private segregateDeputiesService: SegregateDeputiesService) { }
  findRebels(party) {
    return party.deputies.filter(( value ) => {
      return value.data[Const.P_REBEL] > 1;
    }).length;
  }
  sumValueByKey(party, key) {
    let summ = 0;
    party.deputies.forEach(( value ) => {
      summ += value.data[key];
    });
    return parseFloat(summ.toFixed(2));
  }
  sumDeputyExpenses(deputy): number {
    let res = 0;
    this.deputyExpensesArr.forEach(expenseIndex => {
      if (!isNaN(parseFloat(deputy[expenseIndex])) && isFinite(deputy[expenseIndex])) {
        res += deputy[expenseIndex];
      }
    });
    return res;
  }
  sumPartyExpenses(party): number {
    let partyExpenses = 0;
    party.deputies.forEach(( value ) => {
      partyExpenses += this.sumDeputyExpenses(value.data);
    });
    return parseFloat(partyExpenses.toFixed(2));
  }

  makeObjectForChartParty(party) {
    let  deputiesAmount = party['deputies'].length;
    let partyObjForChart = {
      club_id: party[Const.C_ID],
      club_name: party[Const.C_NAME],
      deputies_amount: deputiesAmount,
      expenses: this.sumPartyExpenses(party),
      expenses_per_deputy: parseFloat((this.sumPartyExpenses(party) / deputiesAmount).toFixed(2)),
      attendance: this.sumValueByKey(party, Const.P_ATTENDANCE),
      attendance_per_deputy: parseFloat((this.sumValueByKey(party, Const.P_ATTENDANCE) / deputiesAmount).toFixed(2)),
      statement: this.sumValueByKey(party, Const.P_ATTENDANCE),
      statement_per_deputy: parseFloat((this.sumValueByKey(party, Const.P_ATTENDANCE) / deputiesAmount).toFixed(2)),
      motion: this.sumValueByKey(party, Const.P_MOTIONS),
      motion_per_deputy: parseFloat((this.sumValueByKey(party, Const.P_MOTIONS) / deputiesAmount).toFixed(2)),
      rebels: this.sumValueByKey(party, Const.P_REBEL),
      rebels_per_deputy: parseFloat((this.sumValueByKey(party, Const.P_REBEL) / deputiesAmount).toFixed(2)),
      rebels_amount: this.findRebels(party)
    };
    return partyObjForChart;
  }
  makeObjectForChartDeputies(allDeputies) {
    return this.segregateDeputiesService.segregateDeputies(allDeputies);
  }
}
