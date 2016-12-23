import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from './http';
import {
  ParliamentSessionApiHttpResponse,
  ParliamentSessionsDaysApiHttpResponse,
  SingleParliamentSessionHttpResponse,
  SingleParliamentSessionsDayHttpResponse
} from '../interfaces/';

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
   * @returns Observable
   */
  getSessionDataFiltered(filterObj = {}): Observable<ParliamentSessionApiHttpResponse> {
    return this.httpService.httpRequest('sejm_posiedzenia.json', 'get', {
      queryObj: filterObj
    }).map(responseObj => {
      return responseObj.response;
    });
  }
  /**
   * Get single parliament session data
   * @param id The id of parliament session data you want to get
   * @returns Observable
   */
  getSingleSessionData(id: string): Observable<SingleParliamentSessionHttpResponse> {
    return this.httpService.httpRequest(`sejm_posiedzenia/${id}.json`, 'get').map(responseObj => {
      return responseObj.response;
    });
  }
  /**
   * Get array of parliament sessions days data
   * @param filterObj Parliament sessions days filter object (e.g. filterObj.conditions['sejm_posiedzenia.kadencja'],
   *  filterObj.conditions['sejm_posiedzenia_dni.posiedzenie_id']).
   *  Other filter options available at  https://mojepanstwo.pl/api/sejmometr
   * @returns Observable
   */
  getSessionsDaysData(filterObj = {}): Observable<ParliamentSessionsDaysApiHttpResponse> {
    return this.httpService.httpRequest(`sejm_posiedzenia_dni.json`, 'get', {
      queryObj: filterObj
    }).map(responseObj => {
      return responseObj.response;
    });
  }
  /**
   * Get single parliament session day data
   * @param id The id of parliament session day data you want to get
   * @returns Observable
   */
  getSingleSessionDaysData(id: string): Observable<SingleParliamentSessionsDayHttpResponse> {
    return this.httpService.httpRequest(`sejm_posiedzenia_dni/${id}.json`, 'get').map(responseObj => {
      return responseObj.response;
    });
  }
}
