/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SegregateDeputiesService } from './segregate-deputies.service';

describe('SegregateDeputiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SegregateDeputiesService]
    });
  });

  it('should ...', inject([SegregateDeputiesService], (service: SegregateDeputiesService) => {
    expect(service).toBeTruthy();
  }));
});
