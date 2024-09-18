import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

const allowedResources = ['people', 'starship'];
export const resourceGuard: CanActivateFn = route => {
  return allowedResources.includes(route.paramMap.get('resource')!) || inject(Router).createUrlTree(['/play']);
};
