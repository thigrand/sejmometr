import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {
  SingleDeputyDataHttpResponse
} from '../interfaces/';
import {DeputiesService} from './deputies';
import {SejmometrCfg} from '../cfg/';
import {SejmometrSubjectsObj, DeputyExpenseArrayItem} from '../interfaces/sejmometrProvider';

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
  private subjects: SejmometrSubjectsObj = <SejmometrSubjectsObj>{};
  /**
   * @constructor
   * @param deputiesService DeputiesService provider
   * @param sejmometrCfg Global Sejmometr cfg object
   */
  constructor(
    private deputiesService: DeputiesService,
    private sejmometrCfg: SejmometrCfg
  ) {}

  public getSubject(subjectName: string) {
    if (subjectName === 'allDeputies' && !this.subjects[subjectName]) {
      this.subjects[subjectName] = new Subject<Array<SingleDeputyDataHttpResponse>>();
      // init - populate deputies
      this.getSubject('deputiesHttpResponse').subscribe(deputyData => {
        this.subjects[subjectName].next(deputyData.Dataobject.filter(singleDeputy => {
          return singleDeputy.data['poslowie.mandat_wygasl']  === '0';
        }));
      });
    }
    if (subjectName === 'deputiesHttpResponse' && !this.subjects[subjectName]) {
      let conditions = [];
      conditions['poslowie.kadencja'] = [this.sejmometrCfg.currentCandence];
      this.subjects[subjectName] = this.deputiesService.getDataFiltered({
        conditions,
        limit: '500'
      });
    }
    if (subjectName === 'deputiesIndexedByPP' && !this.subjects[subjectName]) {
      this.subjects[subjectName] = new Subject<Array<Array<SingleDeputyDataHttpResponse>>>();
      this.refreshDeputiesIndexedByPP();
    }
    if (subjectName === 'mostExpensiveDeputies' && !this.subjects[subjectName]) {
      this.subjects[subjectName] = new Subject<Array<DeputyExpenseArrayItem>>();
      this.refreshMostExpensiveDeputies();
    }

    return this.subjects[subjectName];
  }

  public sumDeputyExpenses(deputy: SingleDeputyDataHttpResponse): number {
    let res = 0;
    this.deputyExpensesArr.forEach(expenseIndex => {
      if (!isNaN(parseFloat(deputy.data[expenseIndex])) && isFinite(deputy.data[expenseIndex])) {
        res += deputy.data[expenseIndex];
      }
    });
    return res;
  }
  /**
   * Reindex allDeputies data by club_name and save it to deputiesIndexedByPP.
   * @private
   */
  private refreshDeputiesIndexedByPP() {
    this.getSubject('allDeputies').subscribe(deputies => {
      let res = [];
      deputies.forEach(singleDeputy => {
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

      this.getSubject('deputiesIndexedByPP').next(
        res
      );
    });
  }
  private refreshMostExpensiveDeputies() {
    this.getSubject('allDeputies').subscribe(allDeputies => {
      let deputies = allDeputies.slice();
      let res = deputies.sort((valA: SingleDeputyDataHttpResponse, valB: SingleDeputyDataHttpResponse) => {
        return (this.sumDeputyExpenses(valB) - this.sumDeputyExpenses(valA));
      }).map(deputy => {
        return {
          deputy_id: deputy.data['ludzie.id'],
          name: deputy.data['ludzie.nazwa'],
          club_id: deputy.data['sejm_kluby.id'],
          club_name: deputy.data['sejm_kluby.nazwa'],
          spent: this.sumDeputyExpenses(deputy).toFixed(2),
          deputyData: deputy
        };
      });
      this.getSubject('mostExpensiveDeputies').next(res);
    });
  }
}
