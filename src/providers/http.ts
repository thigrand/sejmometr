import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
  private apirUrl: string = 'https://api-v3.mojepanstwo.pl/dane/';

  constructor(public http: Http) {}

  getResources(method: string){
    return this.http.get(`${this.apirUrl}${method}`)
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
