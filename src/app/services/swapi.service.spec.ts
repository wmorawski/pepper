import { TestBed } from '@angular/core/testing';

import { SWAPIService } from './swapi.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('SWAPIService', () => {
  let service: SWAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SWAPIService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SWAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
