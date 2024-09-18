import { Component, DestroyRef, effect, OnInit, TemplateRef, viewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { getRandomId, resourceCommonAttributeMap, resourceComparatorFn, resourceMinMaxIdMap } from '../../../utils/resource.utils';
import { People, ResourceType, Starships } from '../../../types/resource.types';
import { catchError, combineLatest, EMPTY, map, Subject, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SWAPIResourceResponse } from '../../../types/swapi.http.types';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-resource-card',
  standalone: true,
  imports: [AsyncPipe, MatCard, MatCardTitle, MatButton, RouterLink, MatProgressSpinner, MatCardContent, NgTemplateOutlet, MatList, MatListItem, MatDivider],
  templateUrl: './resource.component.html',
  styleUrl: './resource.component.scss',
  providers: [],
})
export class ResourceComponent implements OnInit {
  public resources$ = new Subject<[People | Starships, People | Starships] | null>();
  public winner$ = this.resources$.pipe(map(resources => (Array.isArray(resources) ? resourceComparatorFn(...resources) : null)));
  public resourceType: ResourceType;
  public resourceCommonAttribute = '';
  public loading = false;
  public hasError = false;

  public peopleTpl = viewChild<TemplateRef<any>>('peopleTpl');
  public starshipsTpl = viewChild<TemplateRef<any>>('starshipsTpl');

  public resourceTemplateMap: Partial<Record<ResourceType, TemplateRef<any>>> = {};
  public resourceLabelKeysMap: Partial<Record<ResourceType, string[]>> = {
    [ResourceType.People]: ['birth_year', 'eye_color', 'gender', 'hair_color', 'height', 'mass'],
    [ResourceType.Starships]: ['model', 'starship_class', 'manufacturer', 'cost_in_credits', 'hyperdrive_rating', 'crew'],
  };

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private destroyRef: DestroyRef
  ) {
    this.resourceType = this.route.snapshot.params['resource'];

    effect(() => {
      this.resourceTemplateMap = {
        [ResourceType.People]: this.peopleTpl()!,
        [ResourceType.Starships]: this.starshipsTpl()!,
      };
    });
  }

  public ngOnInit() {
    this.resourceCommonAttribute = resourceCommonAttributeMap[this.resourceType]!;
    this.fetchResources();
  }

  public fetchResources() {
    this.resources$.next(null);
    this.loading = true;
    const id1 = getRandomId(...resourceMinMaxIdMap[this.resourceType]!);
    const id2 = getRandomId(...resourceMinMaxIdMap[this.resourceType]!);
    combineLatest([this.fetchResource(this.resourceType, id1), this.fetchResource(this.resourceType, id2)])
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        take(1),
        catchError(() => {
          this.loading = false;
          this.hasError = true;
          return EMPTY;
        })
      )
      .subscribe(([resource1, resource2]) => {
        this.loading = false;
        this.hasError = false;
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
