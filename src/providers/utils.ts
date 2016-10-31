import {Injectable} from '@angular/core';

@Injectable()
export class UtilsService {
  constructor() {}

  mergeObjects(obj1,obj2): Object{
    var obj3 = {};
    for (var attrname in obj1) {obj3[attrname] = obj1[attrname];}
    for (var attrname in obj2) {obj3[attrname] = obj2[attrname];}
    return obj3;
  }
  arrayToObject(arr: Array<any>){
    var obj = arr.reduce(function(o, v, i) {
      o[i] = v;
      return o;
    }, {});

    return obj;
  }
}
