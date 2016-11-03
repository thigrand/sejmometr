import {Injectable} from '@angular/core';
import {HttpService} from "./http";
import {DeputiesLayers} from '../interfaces/';

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
   * @returns Observable (subscribe to it to receive http response data (interface: DeputyDataHttpResponse))
   */
  getDataFiltered(filterObj = {}){
    return this.httpService.getResources('poslowie.json', filterObj);
  }
  /**
   * Get single deputy data
   * @param id The id of deputy data you want to get
   * @param layers Array of strings with names of additional data you want to get (more infor available at https://mojepanstwo.pl/api/sejmometr)
   * @returns Observable (subscribe to it to receive http response data (interface: SingleDeputyDataHttpResponse))
   */
  getSingleData(id: string, layers?: DeputiesLayers.DeputiesLayersListArr){
    let layersObj = layers ? {layers} : {};
    return this.httpService.getResources(`poslowie/${id}.json`, layersObj)
  }
}
