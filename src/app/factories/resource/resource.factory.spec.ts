import { ActivatedRoute } from '@angular/router';
import { ResourceType } from '../../types/resource.types';
import { TestBed } from '@angular/core/testing';
import { resourceFactory } from './resource.factory';
import { PeopleFactory } from './people.factory';

describe('resourceFactory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                resource: ResourceType.People,
              },
            },
          },
        },
      ],
    });
  });

  it('should return PeopleFactory', () => {
    TestBed.runInInjectionContext(() => {
      expect(resourceFactory()).toBeInstanceOf(PeopleFactory);
    });
  });

  it('should return Error', () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                resource: 'Not implemented',
              },
            },
          },
        },
      ],
    });
    TestBed.runInInjectionContext(() => {
      expect(() => resourceFactory()).toThrowError();
    });
  });
});
