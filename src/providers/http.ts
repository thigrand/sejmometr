import {Injectable} from '@angular/core';
import {
  Http,
  Response,
  URLSearchParams
} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable()
/**
 * Class used to manage http requests.
 * @class HttpService
 */
export class HttpService {
  private apiUrl: string = 'https://api-v3.mojepanstwo.pl/dane/';
  /**
   * @constructor
   * @param Http Angular http service
   */
  constructor(
    public http: Http
  ) {}

  /*
   *
   *    queryObj convert examples:
   *      - queryObj.page=0 converts to page=0
   *      - queryObj.layers=['first','second'] converts to layers[]=first&layers[]=second
   *      - queryObj.conditions=[
   *        'condition1' = [
   *          'condition1Value'
   *        ],
   *        'condition2' = [
   *          'condition2Value'
   *        ]
   *      ]   converts to conditions['condition1']=condition1Value&conditions['condition2']=condition2Value
   */
  /**
   * HTTP Get.
   * @param method String appended to api path (e.g. sejm_wystapienia.json -> ${apiUrl}sejm_wystapienia.json)
   * @param queryObj Object which will be converted to URL query string
   * @returns Observable
   */
  getResources(method: string, queryObj?: Object): Observable<any>{
    let params: URLSearchParams = new URLSearchParams();

    if(queryObj){
      let keys: Array<string> = Object.keys(queryObj);
      keys.forEach(key => {
        if(Object.prototype.toString.call( queryObj[key] ) === '[object Array]'){
          for(var arrParamKey in queryObj[key]){
            let arrParam = queryObj[key][arrParamKey];

            if(Object.prototype.toString.call( arrParam ) === '[object Array]'){
              arrParam.forEach(nestedArrParam => {
                params.append(`${key}[${arrParamKey}]`,nestedArrParam);
              });
            }else{
              params.append(`${key}[]`,arrParam);
            }
          }
        }else{
          params.set(key,queryObj[key]);
        }
      });
    }

    return this.http.get(`${this.apiUrl}${method}`,{
      search: params
    })
      .map(this.extractData)
      .catch(this.handleError);
  }
  /**
   * Http response parser (JSON -> Object)
   * @param res Response JSON string
   * @returns Object
   */
  private extractData(res: Response){
    let body = res.json();
    return body || {};
  }
  /**
   * Http response error msg handler
   * @param error Response error object
   * @returns Observable
   */
  private handleError(error: any){
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : `Server error`;
    return Observable.throw(errMsg);
  }
}
