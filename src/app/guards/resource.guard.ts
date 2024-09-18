import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { allowedResources } from '../utils/resource.utils';
import { ResourceType } from '../types/resource.types';

export const resourceGuard: CanActivateFn = route => {
  return allowedResources.includes(route.paramMap.get('resource') as ResourceType) || inject(Router).createUrlTree(['/play']);
};
