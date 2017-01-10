import { Injectable } from '@angular/core';
import { SegregateDeputiesService } from '../services/segregate-deputies.service';

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
  sumValueByKey(party, key) {
    let summ = 0;
    party.deputies.forEach(( value ) => {
      summ += value.data[key];
    });
    return parseFloat(summ.toFixed(2));
  }
  findRebels(party) {
    return party.deputies.filter(( value ) => {
      return value.data['poslowie.zbuntowanie'] > 1;
    }).length;
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
      club_id: party['club_id'],
      club_name: party['club_name'],
      deputies_amount: deputiesAmount,
      expenses: this.sumPartyExpenses(party),
      expenses_per_deputy: parseFloat((this.sumPartyExpenses(party) / deputiesAmount).toFixed(2)),
      attendance: this.sumValueByKey(party, 'poslowie.frekwencja'),
      attendance_per_deputy: parseFloat((this.sumValueByKey(party, 'poslowie.frekwencja') / deputiesAmount).toFixed(2)),
      statement: this.sumValueByKey(party, 'poslowie.liczba_wypowiedzi'),
      statement_per_deputy: parseFloat((this.sumValueByKey(party, 'poslowie.liczba_wypowiedzi') / deputiesAmount).toFixed(2)),
      motion: this.sumValueByKey(party, 'poslowie.liczba_wnioskow'),
      motion_per_deputy: parseFloat((this.sumValueByKey(party, 'poslowie.liczba_wnioskow') / deputiesAmount).toFixed(2)),
      rebels: this.sumValueByKey(party, 'poslowie.zbuntowanie'),
      rebels_per_deputy: parseFloat((this.sumValueByKey(party, 'poslowie.zbuntowanie') / deputiesAmount).toFixed(2)),
      rebels_amount: this.findRebels(party)
    };
    // console.log(partyObjForChart);
    return partyObjForChart;
  }

  makeObjectForChartDeputies(allDeputies) {
    let winners = this.segregateDeputiesService.segregateDeputies(allDeputies);
    let chartArr = [];
    // for (let key in winners) {
    //   chartArr.push({
    //
    //   });
    // }


    return {
      top_expenders: winners['top_expenders'],
      top_attendance: winners['top_attendance'],
      top_absent: winners['top_absent'],
      top_statements: winners['top_statements'],
      top_motion: winners['top_motion'],
      top_rebels: winners['top_rebels']
    };
  }
  prepareDataForChart() {
    // let winners = this.segregateDeputiesService.segregateDeputies(allDeputies);



  }
}
