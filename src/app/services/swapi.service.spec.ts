import {TestBed} from '@angular/core/testing';

import {SWAPIService} from './swapi.service';

describe('SWAPIService', () => {
  let service: SWAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SWAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
