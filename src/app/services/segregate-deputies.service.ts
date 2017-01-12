import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import {Const} from '../commons/constants';

@Injectable()
export class SegregateDeputiesService {
  getTopExpenders(allDeputies) {
    return _.take(allDeputies, 5);
  }
  getFilteredValues(array, key, reverse) { // filtering and taking top5 deputies according to credentials
    let sortedArray = _.sortBy(array, [function(o) {
      return o.deputyData[key];
    }]);
    if (reverse) {
      sortedArray = _.reverse(sortedArray);
    }
    return _.take(sortedArray, 5);
  }
  segregateDeputies(allDeputies) { // preparing object with data and labels for chart on deputies tab
    return {
      top_expenders: this.prepareObjForChart(this.getTopExpenders(allDeputies), 'spent'),
      top_attendance: this.prepareObjForChart(this.getFilteredValues(allDeputies, Const.P_ATTENDANCE, true), Const.P_ATTENDANCE),
      top_absent: this.prepareObjForChart(this.getFilteredValues(allDeputies, Const.P_ATTENDANCE, false), Const.P_ATTENDANCE),
      top_statements: this.prepareObjForChart(this.getFilteredValues(allDeputies, Const.P_STATEMENTS, true), Const.P_STATEMENTS),
      top_motion: this.prepareObjForChart(this.getFilteredValues(allDeputies, Const.P_MOTIONS, true), Const.P_MOTIONS),
      top_rebels: this.prepareObjForChart(this.getFilteredValues(allDeputies, Const.P_REBEL, true), Const.P_REBEL)
    };
  }
  getDataForCategory(array, dataKey) {
    return _.map(array, (e) => {
      return parseFloat((dataKey === 'spent') ? e[dataKey] : e['deputyData'][dataKey]);
    });
  }
  getLabelsForCategory(array, labelKey, dataKey) {
    return _.map(array, (e) => {
      // console.log( e[labelKey] + ' - ' + ((dataKey === 'spent') ? e[dataKey] : e['deputyData'][dataKey]))
      return e[labelKey];
    });
  }
  getIdsForCategory(array, labelKey, dataKey) {
    return _.map(array, (e) => {
      // console.log( e[labelKey] + ' - ' + ((dataKey === 'spent') ? e[dataKey] : e['deputyData'][dataKey]))
      return e[labelKey];
    });
  }
  prepareObjForChart(array, dataKey) { // accumulating data into one object
    return {
      labels: this.getLabelsForCategory(this.getTopExpenders(array), 'name', dataKey),
      data: this.getDataForCategory(this.getTopExpenders(array), dataKey),
      ids: this.getIdsForCategory(this.getTopExpenders(array), 'deputy_id', dataKey)
    };
  }
}
