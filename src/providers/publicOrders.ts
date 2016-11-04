import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from './http';
import {
  PublicOrderDocumentsHttpResponse,
  PublicOrdersDataHttpResponse,
  PublicOrdersFields,
  SinglePublicOrdersDataHttpResponse,
} from '../interfaces/';

@Injectable()
/**
 * Class used to operate on public orders data.
 * Api available at: https://mojepanstwo.pl/api/zamowienia_publiczne
 * @class PublicOrdersService
 */
export class PublicOrdersService {
  /**
   * @constructor
   * @param httpService HttpService provider
   */
  constructor(
    private httpService: HttpService
  ) {}

  /**
   * Get array of public order data
   * @param filterObj Public orders filter object (e.g. filterObj.page, filterObj.limit etc.)
   *  Other filter options available at https://mojepanstwo.pl/api/zamowienia_publiczne
   * @returns Observable (subscribe to it to receive http response data (interface: PublicOrdersDataHttpResponse))
   */
  getDataFiltered(filterObj = {}): Observable<PublicOrdersDataHttpResponse> {
    return this.httpService.getResources('zamowienia_publiczne.json', filterObj);
  }
  /**
   * Get single public order data
   * @param id The id of public order data you want to get
   * @param fields Array of strings with names of additional data you want to get (more info available at https://mojepanstwo.pl/api/zamowienia_publiczne)
   * @returns Observable (subscribe to it to receive http response data (interface: SinglePublicOrdersDataHttpResponse))
   */
  getSingleData(id: string, fields?: PublicOrdersFields.FieldsListArr): Observable<SinglePublicOrdersDataHttpResponse> {
    let fieldsObj = fields ? {fields} : {};
    return this.httpService.getResources(`zamowienia_publiczne/${id}.json`, fieldsObj);
  }
  /**
   * Get single public order documents data (array)
   * @param id The id of public order data you want to get
   * @param isDetailed Set to true if you want to get document detailed info
   * @returns Observable (subscribe to it to receive http response data (interface: PublicOrderDocumentsHttpResponse))
   */
  getPublicOrderDocuments(id: string, isDetailed: boolean = false): Observable<PublicOrderDocumentsHttpResponse> {
    let conditions = [];
    conditions['zamowienia_publiczne_dokumenty.parent_id'] = [];
    conditions['zamowienia_publiczne_dokumenty.parent_id'].push(id);

    let httpObj = {
      conditions
    };
    if (isDetailed === true) {
      httpObj['fields'] = ['details'];
    }
    return this.httpService.getResources(`zamowienia_publiczne_dokumenty.json`, httpObj);
  }
}
