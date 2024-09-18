import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { resourceGuard } from './resource.guard';

describe('resourceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => TestBed.runInInjectionContext(() => resourceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
