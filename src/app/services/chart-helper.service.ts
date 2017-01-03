import { Injectable } from '@angular/core';

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
  constructor() { }
  public sumValueByKey(party, key){
    let summ = 0;
    party.deputies.forEach(( value ) => {
      summ += value.data[key];
    });
    return parseFloat(summ.toFixed(2));
  }
  public findRebels(party){
    return party.deputies.filter(( value ) => {
      return (value.data["poslowie.zbuntowanie"] > 1) ? true : false;
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
  makeObjectForChart(party){
    // console.log(party);
    let  deputiesAmount = party["deputies"].length;
    let partyObjForChart = {
      club_id: party["club_id"],
      club_name: party["club_name"],
      deputies_amount: deputiesAmount,
      expenses:  this.sumPartyExpenses(party),
      expenses_per_deputy: parseFloat((this.sumPartyExpenses(party) / deputiesAmount).toFixed(2)),
      attendance: this.sumValueByKey(party, "poslowie.frekwencja"),
      attendance_per_deputy: parseFloat((this.sumValueByKey(party, "poslowie.frekwencja") / deputiesAmount).toFixed(2)),
      statement: this.sumValueByKey(party, "poslowie.liczba_wypowiedzi"),
      statement_per_deputy: parseFloat((this.sumValueByKey(party, "poslowie.liczba_wypowiedzi") / deputiesAmount).toFixed(2)),
      motion: this.sumValueByKey(party, "poslowie.liczba_wnioskow"),
      motion_per_deputy: parseFloat((this.sumValueByKey(party, "poslowie.liczba_wnioskow") / deputiesAmount).toFixed(2)),
      rebels: this.sumValueByKey(party, "poslowie.zbuntowanie"),
      rebels_per_deputy: parseFloat((this.sumValueByKey(party, "poslowie.zbuntowanie") / deputiesAmount).toFixed(2)),
      rebels_amount: this.findRebels(party)
    };
    return partyObjForChart;
  }
}
