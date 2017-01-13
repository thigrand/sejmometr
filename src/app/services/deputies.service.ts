import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  DeputiesLayers,
  DeputyDataApiResponse,
  SingleDeputyDataHttpResponse
} from '../interfaces';
import { HttpService } from './http.service';

@Injectable()
/**
 * Class used to operate on deputies data.
 * Api available at: https://mojepanstwo.pl/api/sejmometr
 * @class DeputiesService
 */
export class DeputiesService {
  /**
   * @constructor
   * @param httpService HttpService provider
   */
  constructor(
    private httpService: HttpService
  ) {}
  /**
   * Get array of deputies data
   * @param filterObj Deputies filter object (e.g. filterObj.conditions['poslowie.kadencja'])
   *  Other filter options available at  https://mojepanstwo.pl/api/sejmometr
   * @returns Observable
   */
  getDataFiltered (filterObj = {}): Observable<DeputyDataApiResponse> {
    return this.httpService.httpRequest('poslowie.json', 'get', {
      queryObj: filterObj
    }).map(responseObj => {
      return responseObj.response;
    });
  }
  /**
   * Get single deputy data
   * @param id The id of deputy data you want to get
   * @param layers Array of strings with names of additional data you want
   * to get (more infor available at https://mojepanstwo.pl/api/sejmometr)
   * @returns Observable
   */
  getSingleData(id: any, layers?: DeputiesLayers.DeputiesLayersListArr): Observable<SingleDeputyDataHttpResponse> {
    return this.httpService.httpRequest(`poslowie/${id}.json`, 'get', {
      queryObj:  layers ? {layers} : {}
    }).map(responseObj => {
      return responseObj.response;
    });
  }
}
