import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

@Injectable()
/**
 * Class with many misc features.
 * @class UtilitiesService
 */
export class UtilitiesService {
  /**
   * Check if Response Object is in json format.
   * @param response Response object to be tested.
   * @returns boolean
   */
  isJson(response: Response): boolean {
    try {
      response.json();
    } catch (e) {
      return false;
    }
    return true;
  }
  /**
   * Check if tested variable is a finite number.
   * @param testVar Object to be tested.
   * @returns boolean
   */
  isNumber(testVar: any): boolean {
    return !isNaN(parseFloat(testVar)) && isFinite(testVar);
  }
}
