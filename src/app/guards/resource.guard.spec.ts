import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { resourceGuard } from './resource.guard';
import { ResourceType } from '../types/resource.types';

describe('resourceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => TestBed.runInInjectionContext(() => resourceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should return true if activating People', async () => {
    const activatedRouterSnapshot = { url: [], paramMap: { get: () => ResourceType.People } };
    const result = executeGuard(activatedRouterSnapshot as unknown as ActivatedRouteSnapshot, undefined as unknown as RouterStateSnapshot);
    expect(result).toEqual(true);
  });

  it('should return /play if not allowed value provided', async () => {
    const activatedRouterSnapshot = { url: [], paramMap: { get: () => 'random' } };
    const result = executeGuard(activatedRouterSnapshot as unknown as ActivatedRouteSnapshot, undefined as unknown as RouterStateSnapshot);
    TestBed.runInInjectionContext(() => {
      const expected: UrlTree = new Router().createUrlTree(['/play']);
      expect(result).toEqual(expected);
    });
  });
});
