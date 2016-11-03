import {Injectable} from '@angular/core';
import {HttpService} from "./http";

@Injectable()
/**
 * Class used to operate on parliament sessions data.
 * Api available at: https://mojepanstwo.pl/api/sejmometr
 * @class ParliamentSessionsService
 */
export class ParliamentSessionsService {
  /**
   * @constructor
   * @param httpService HttpService provider
   */
  constructor(
    private httpService: HttpService
  ) {}
  /**
   * Get array of parliament sessions data
   * @param filterObj Parliament sessions filter object (e.g. filterObj.conditions['sejm_posiedzenia.kadencja'])
   *  Other filter options available at  https://mojepanstwo.pl/api/sejmometr
   * @returns Observable (subscribe to it to receive http response data (interface: ParliamentSessionHttpResponse))
   */
  getSessionDataFiltered(filterObj = {}){
    return this.httpService.getResources('sejm_posiedzenia.json', filterObj);
  }
  /**
   * Get single parliament session data
   * @param id The id of parliament session data you want to get
   * @returns Observable (subscribe to it to receive http response data (interface: SingleParliamentSessionHttpResponse))
   */
  getSingleSessionData(id: string){
    return this.httpService.getResources(`sejm_posiedzenia/${id}.json`);
  }
  /**
   * Get array of parliament sessions days data
   * @param filterObj Parliament sessions days filter object (e.g. filterObj.conditions['sejm_posiedzenia.kadencja'],
   *  filterObj.conditions['sejm_posiedzenia_dni.posiedzenie_id']).
   *  Other filter options available at  https://mojepanstwo.pl/api/sejmometr
   * @returns Observable (subscribe to it to receive http response data (interface: ParliamentSessionsDaysHttpResponse))
   */
  getSessionsDaysData(filterObj = {}){
    return this.httpService.getResources(`sejm_posiedzenia_dni.json`, filterObj);
  }
  /**
   * Get single parliament session day data
   * @param id The id of parliament session day data you want to get
   * @returns Observable (subscribe to it to receive http response data (interface: SingleParliamentSessionsDayHttpResponse))
   */
  getSingleSessionDaysData(id: string){
    return this.httpService.getResources(`sejm_posiedzenia_dni/${id}.json`);
  }
}
