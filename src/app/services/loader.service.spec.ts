/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoaderserviceService } from './loaderservice.service';

describe('LoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderserviceService]
    });
  });

  it('should ...', inject([LoaderserviceService], (service: LoaderserviceService) => {
    expect(service).toBeTruthy();
  }));
});
