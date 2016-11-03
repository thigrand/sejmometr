import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable()
export class HttpService {
  private apiUrl: string = 'https://api-v3.mojepanstwo.pl/dane/';

  constructor(
    public http: Http
  ) {}

  getResources(method: string, dataObj?: Object){
    let params: URLSearchParams = new URLSearchParams();

    if(dataObj){
      let keys: Array<string> = Object.keys(dataObj);
      keys.forEach(key => {
        if(Object.prototype.toString.call( dataObj[key] ) === '[object Array]'){
          for(var arrParamKey in dataObj[key]){
            let arrParam = dataObj[key][arrParamKey];

            if(Object.prototype.toString.call( arrParam ) === '[object Array]'){
              arrParam.forEach(nestedArrParam => {
                params.append(`${key}[${arrParamKey}]`,nestedArrParam);
              });
            }else{
              params.append(`${key}[]`,arrParam);
            }
          }
        }else{
          params.set(key,dataObj[key]);
        }
      });
    }

    return this.http.get(`${this.apiUrl}${method}`,{
      search: params
    })
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response){
    let body = res.json();
    return body || {};
  }

  private handleError(error: any){
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : `Server error`;
    return Observable.throw(errMsg);
  }
}
