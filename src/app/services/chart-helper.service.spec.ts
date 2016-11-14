/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChartHelperService } from './chart-helper.service';

describe('Service: ChartHelper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartHelperService]
    });
  });

  it('should ...', inject([ChartHelperService], (service: ChartHelperService) => {
    expect(service).toBeTruthy();
  }));
});
