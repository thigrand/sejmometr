import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class SegregateDeputiesService {
  constructor() {
  }
  getTopExpenders(allDeputies: any ) {
    return _.take(allDeputies, 5);
  }
  getFilteredValues(array, key, reverse) {
    let sortedArray = _.sortBy(array, [function(o) {
      return o.deputyData[key];
    }]);
    if (reverse) {
      sortedArray = _.reverse(sortedArray);
    }
    return _.take(sortedArray, 5);
  }
  segregateDeputies(allDeputies) {
    let winners = {
      top_expenders: this.prepareObjForChart(this.getTopExpenders(allDeputies), 'spent'),
      top_attendance: this.prepareObjForChart(this.getFilteredValues(allDeputies, 'poslowie.frekwencja', true), 'poslowie.frekwencja'),
      top_absent: this.prepareObjForChart(this.getFilteredValues(allDeputies, 'poslowie.frekwencja', false), 'poslowie.frekwencja'),
      top_statements: this.prepareObjForChart(this.getFilteredValues(allDeputies, 'poslowie.liczba_wypowiedzi', true), 'poslowie.liczba_wypowiedzi'),
      top_motion: this.prepareObjForChart(this.getFilteredValues(allDeputies, 'poslowie.liczba_wnioskow', true), 'poslowie.liczba_wnioskow'),
      top_rebels: this.prepareObjForChart(this.getFilteredValues(allDeputies, 'poslowie.zbuntowanie', true), 'poslowie.zbuntowanie')
    };
    return winners;
  }
  getDataForCategory(array, dataKey) {
    return _.map(array, (e) => {
      return parseFloat((dataKey === 'spent') ? e[dataKey] : e['deputyData'][dataKey]);
    });
  }

  getLabelsForCategory(array, labelKey) {
    return _.map(array, (e) => {
      return e[labelKey];
    });
  }
  prepareObjForChart(array, dataKey) {
    console.log(array);
    return {
      labels: this.getLabelsForCategory(this.getTopExpenders(array), 'name'),
      data: this.getDataForCategory(this.getTopExpenders(array), dataKey),
    };
  }
}
