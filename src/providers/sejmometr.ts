import {Injectable} from '@angular/core';
import {HttpService} from "./http";

@Injectable()
/**
 * Class used to operate on deputies/parliament speeches/parliament sessions data.
 * @class SejmometrService
 */
export class SejmometrService {
  /**
   * @constructor
   * @param httpService HttpService provider
   */
  constructor(
    private httpService: HttpService
  ) {}
}
