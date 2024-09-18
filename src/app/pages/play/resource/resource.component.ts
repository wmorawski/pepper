import { Component, DestroyRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { getRandomId, resourceCommonAttributeMap, resourceComparatorFn, resourceMinMaxIdMap } from '../../../utils/resource.utils';
import { People, ResourceType, Starships } from '../../../types/resource.types';
import { combineLatest, map, Subject, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SWAPIResourceResponse } from '../../../types/swapi.http.types';
import { AsyncPipe } from '@angular/common';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-resource',
  standalone: true,
  imports: [AsyncPipe, MatCard, MatCardTitle, MatButton, RouterLink],
  templateUrl: './resource.component.html',
  styleUrl: './resource.component.scss',
  providers: [],
})
export class ResourceComponent implements OnInit {
  public resources$ = new Subject<[People | Starships, People | Starships]>();
  public winner$ = this.resources$.pipe(map(resources => resourceComparatorFn(...resources)));
  public resourceType: ResourceType;
  public resourceCommonAttribute = '';

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private destroyRef: DestroyRef
  ) {
    this.resourceType = this.route.snapshot.params['resource'];
  }

  public ngOnInit() {
    this.resourceCommonAttribute = resourceCommonAttributeMap[this.resourceType]!;
    this.fetchResources();
  }

  public fetchResources() {
    const id1 = getRandomId(...resourceMinMaxIdMap[this.resourceType]!);
    const id2 = getRandomId(...resourceMinMaxIdMap[this.resourceType]!);
    combineLatest([this.fetchResource(this.resourceType, id1), this.fetchResource(this.resourceType, id2)])
      .pipe(takeUntilDestroyed(this.destroyRef), take(1))
      .subscribe(([resource1, resource2]) => {
        this.resources$.next([resource1.result.properties, resource2.result.properties]);
        console.log({
          resource1,
          resource2,
          winner: resourceComparatorFn(resource1.result.properties, resource2.result.properties),
        });
      });
  }

  private fetchResource(resource: ResourceType, id: number) {
    return this.httpClient.get<SWAPIResourceResponse<People | Starships>>(`https://www.swapi.tech/api/${resource}/${id}`);
  }
}
