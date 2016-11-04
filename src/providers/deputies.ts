import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from './http';
import {
  DeputiesLayers,
  DeputyDataHttpResponse,
  SingleDeputyDataHttpResponse
} from '../interfaces/';

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
  getDataFiltered (filterObj = {}): Observable<DeputyDataHttpResponse> {
    return this.httpService.getResources('poslowie.json', filterObj);
  }
  /**
   * Get single deputy data
   * @param id The id of deputy data you want to get
   * @param layers Array of strings with names of additional data you want to get (more infor available at https://mojepanstwo.pl/api/sejmometr)
   * @returns Observable
   */
  getSingleData(id: string, layers?: DeputiesLayers.DeputiesLayersListArr): Observable<SingleDeputyDataHttpResponse> {
    let layersObj = layers ? {layers} : {};
    return this.httpService.getResources(`poslowie/${id}.json`, layersObj);
  }
}