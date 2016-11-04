import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from "./http";
import {
  ParliamentSpeechHttpResponse,
  SingleParliamentSpeechHttpResponse
} from "../interfaces/";

@Injectable()
/**
 * Class used to operate on parliament sessions speeches data.
 * Api available at: https://mojepanstwo.pl/api/sejmometr
 * @class ParliamentSpeechService
 */
export class ParliamentSpeechService {
  /**
   * @constructor
   * @param httpService HttpService provider
   */
  constructor(
    private httpService: HttpService
  ) {}
  /**
   * Get array of parliament speech data
   * @param filterObj Parliament sessions filter object (e.g. filterObj.conditions['sejm_wystapienia.posiedzenie_id'])
   *  Other filter options available at  https://mojepanstwo.pl/api/sejmometr
   * @returns Observable (subscribe to it to receive http response data (interface: ParliamentSpeechHttpResponse))
   */
  getParliamentSpeechesDataFiltered(filterObj = {}): Observable<ParliamentSpeechHttpResponse>{
    return this.httpService.getResources('sejm_wystapienia.json', filterObj);
  }
  /**
   * Get single parliament speech data
   * @param id The id of parliament speech data you want to get
   * @param isDetails Set to true if speech detailed info needed
   * @returns Observable (subscribe to it to receive http response data (interface: SingleParliamentSpeechHttpResponse))
   */
  getSingleParliamentSpeechData(id: string, isDetails: boolean = false): Observable<SingleParliamentSpeechHttpResponse>{
    let layersObj = isDetails===true ? {
      layers: [
        'html'
      ]
    } : {};
    return this.httpService.getResources(`sejm_wystapienia/${id}.json`, layersObj);
  }
}
