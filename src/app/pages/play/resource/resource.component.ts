import { Component, DestroyRef, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Resource, ResourceType } from '../../../types/resource.types';
import { catchError, combineLatest, delay, EMPTY, filter, map, Subject, take, withLatestFrom } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { ResourceCardComponent } from '../../../components/resource-card/resource-card.component';
import { MatDialog } from '@angular/material/dialog';
import { WinnerDialogComponent } from '../../../dialogs/winner-dialog/winner-dialog.component';
import { resourceFactory } from '../../../factories/resource/resource.factory';
import { ResourceCreator } from '../../../factories/resource/resource.creator';
import { Store } from '@ngxs/store';
import { IncrementScoreAction } from '../../../scoreboard/scoreboard.actions';
import { SWAPIService } from '../../../services/swapi.service';

@Component({
  selector: 'app-resource',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCard,
    MatCardTitle,
    MatButton,
    RouterLink,
    MatProgressSpinner,
    MatCardContent,
    NgTemplateOutlet,
    MatList,
    MatListItem,
    MatDivider,
    ResourceCardComponent,
  ],
  templateUrl: './resource.component.html',
  styleUrl: './resource.component.scss',
  providers: [{ provide: ResourceCreator, useFactory: resourceFactory, deps: [ActivatedRoute] }],
})
export class ResourceComponent implements OnInit {
  public resources$ = new Subject<[Resource, Resource] | null>();
  public winner$ = this.resources$.pipe(map(resources => (Array.isArray(resources) ? this.resourceCreator.comparatorFn(...resources) : null)));
  public resourceType: ResourceType = this.resourceCreator.getResourceType();
  public resourceCommonAttribute = '';
  public loading = false;
  public hasError = false;
  public resourceProperties: string[] = [];
  public calculatingWinner = false;

  constructor(
    private SWAPIService: SWAPIService,
    private destroyRef: DestroyRef,
    private dialog: MatDialog,
    private resourceCreator: ResourceCreator,
    private store: Store
  ) {}

  public ngOnInit() {
    this.resourceCommonAttribute = this.resourceCreator.getCommonAttribute();
    this.resourceProperties = this.resourceCreator.getProperties();
    this.fetchResources();
    this.winner$
      .pipe(
        filter(resource => !!resource),
        withLatestFrom(this.resources$),
        delay(1000),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(([winningResource, resources]) => {
        const winningPlayer = resources!.findIndex(resource => resource === winningResource) === 0 ? 'player1' : 'player2';
        this.calculatingWinner = false;
        this.store.dispatch(new IncrementScoreAction(winningPlayer));
        this.dialog.open(WinnerDialogComponent, {
          data: {
            resource: winningResource,
            properties: this.resourceProperties,
          },
        });
      });
  }

  public fetchResources() {
    this.resources$.next(null);
    this.loading = true;
    const [id1, id2] = this.resourceCreator.getRandomIds();
    combineLatest([this.SWAPIService.fetchResource(this.resourceType, id1), this.SWAPIService.fetchResource(this.resourceType, id2)])
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
        this.calculatingWinner = true;
        this.loading = false;
        this.hasError = false;
        this.resources$.next([resource1.result.properties, resource2.result.properties]);
      });
  }
}
