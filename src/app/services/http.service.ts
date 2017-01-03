import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import {
  MappedHttpResponse,
  HttpRequestOptions
} from '../interfaces';
import { UtilitiesService } from './utilities.service';

@Injectable()
/**
 * Class used to manage http requests.
 * @class HttpService
 */
export class HttpService {
  private apiUrl: string = 'https://api-v3.mojepanstwo.pl/dane/';
  /**
   * @constructor
   * @param http Angular http service
   * @param utilitiesService Service with many misc features.
   */
  constructor(
    private http: Http,
    private utilitiesService: UtilitiesService
  ) {}

  /**
   * Method handling all http request features
   * @param method Used to determine which api data are to be requested.
   * @param requestType Used to determing what type of request is to be used.
   * @param requestOptions Additional request cfg (queryObj, credentials, alternate mapping functions)
   * @returns Observable
   */
  public httpRequest(
    method: string,
    requestType: 'get'|'post'|'put'|'delete',
    requestOptions: HttpRequestOptions = {}
  ): Observable<MappedHttpResponse> {
    let request;
    if (requestType === 'get') {
      request = this.http.get(`${this.apiUrl}${method}`, {
        search: this.objToQueryStr(requestOptions.queryObj),
        withCredentials: requestOptions.withCredentials || false
      });
    } else if (requestType === 'delete') {
      request = this.http[requestType](`${this.apiUrl}${method}`, {
        withCredentials:  requestOptions.withCredentials || false
      });
    } else {
      request = this.http[requestType](`${this.apiUrl}${method}`, requestOptions.queryObj, {
        withCredentials:  requestOptions.withCredentials || false
      });
    }

    return request
      .map((requestOptions.mapFunctions) ? requestOptions.mapFunctions.success : (data) => this.extractData(data))
      .catch((requestOptions.mapFunctions) ? requestOptions.mapFunctions.fail : (data) => this.handleError(data));
  }

  /**
   * Http response parser (JSON -> Object)
   * @param response Response JSON string
   * @returns Object
   */
  private extractData(response: Response): MappedHttpResponse {
    return {
      response: this.utilitiesService.isJson(response) ? response.json() : '',
      status: response.status,
      type: response.type,
      myStatus: true,
      headers: response.headers
    };
  }
  /**
   * Http response error msg handler
   * @param response Response error object
   * @returns Observable
   */
  private handleError(response: any): Observable<MappedHttpResponse> {
    return Observable.of({
      response: this.utilitiesService.isJson(response) ? response.json() : {},
      status: response.status,
      type: response.type,
      myStatus: false,
      headers: response.headers
    });
  }

  /*
   *    queryObj convert examples:
   *      - queryObj.page=0 converts to page=0
   *      - queryObj.layers=['first','second'] converts to layers[]=first&layers[]=second
   *      - queryObj.conditions= {
   *        'condition1' = [
   *          'condition1Value'
   *        ],
   *        'condition2' = [
   *          'condition2Value'
   *        ]
   *      }   converts to conditions['condition1']=condition1Value&conditions['condition2']=condition2Value
   *      - queryObj.conditions= {
   *        'condition1' = 5,
   *        'condition2' = 9
   *      }   converts to conditions['condition1']=5&conditions['condition2']=9
   */
  /**
   * Parse Object to URLSearchParams
   * @param queryObj Object to be parsed.
   * @returns URLSearchParams
   */
  private objToQueryStr(queryObj: Object): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();
    let keys: Array<string> = Object.keys(queryObj);

    keys.forEach(key => {
      if (Object.prototype.toString.call( queryObj[key] ) === '[object Array]') {
        queryObj[key].forEach(kValue => {
          params.append(`${key}[]`, kValue);
        });
      } else if (Object.prototype.toString.call(queryObj[key]) === '[object Object]') {
        for (let arrParamKey in queryObj[key]) {
          let arrParam = queryObj[key][arrParamKey];
          if (Object.prototype.toString.call( arrParam ) === '[object Array]') {
            arrParam.forEach(nestedArrParam => {
              params.append(`${key}[${arrParamKey}]`, nestedArrParam);
            });
          } else {
            params.append(`${key}[${arrParamKey}]`, arrParam);
          }
        }
      } else {
        params.set(key, queryObj[key]);
      }
    });

    return params;
  }
}
