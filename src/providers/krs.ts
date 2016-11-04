import {HttpService} from "./http";
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/';
import {
  KrsDataHttpResponse,
  KrsLayers,
  KrsLegalFormsHttpResponse,
  SingleKrsDataHttpResponse
} from "../interfaces/";

@Injectable()
/**
 * Class used to operate on krs data.
 * Api available at: https://mojepanstwo.pl/api/krs
 * @class KrsService
 */
export class KrsService {
  /**
   * @constructor
   * @param httpService HttpService provider
   */
  constructor(
    private httpService: HttpService
  ) {}
  /**
   * Get array of krs data
   * @param filterObj Krs filter object (e.g. filterObj.page, filterObj.limit etc.)
   *  Other filter options available at  https://mojepanstwo.pl/api/krs
   * @returns Observable
   */
  getDataFiltered(filterObj = {}): Observable<KrsDataHttpResponse>{
    return this.httpService.getResources('krs_podmioty.json', filterObj);
  }
  /**
   * Get single krs data
   * @param id The id of krs data you want to get
   * @param layers Array of strings with names of additional data you want to get (more infor available at https://mojepanstwo.pl/api/krs)
   * @returns Observable
   */
  getSingleData(id: string, layers?: KrsLayers.KrsLayersListArr): Observable<SingleKrsDataHttpResponse>{
    let layersObj = layers ? {layers} : {};
    return this.httpService.getResources(`krs_podmioty/${id}.json`, layersObj)
  }
  /**
   * Get list of krs legal forms
   * @param filterObj Krs Documents filter object (e.g. filterObj.conditions['krs_podmioty.forma_prawna_typ_id'], filterObj.conditions.date etc.)
   *  All filter options available at  https://mojepanstwo.pl/api/krs
   * @returns Observable
   */
  getFormyPrawne(filterObj = {}): Observable<KrsLegalFormsHttpResponse>{
    return this.httpService.getResources('krs_formy_prawne.json', filterObj);
  }
}
