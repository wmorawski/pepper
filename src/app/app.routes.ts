import { Routes } from '@angular/router';
import {PlayComponent} from "./pages/play/play.component";
import {ResourceComponent} from "./pages/play/resource/resource.component";
import {resourceGuard} from "./guards/resource.guard";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/play'
  },
  {
    path: 'play',
    component: PlayComponent,
  },
  {
    path: 'play/:resource',
    component: ResourceComponent,
    canActivate: [resourceGuard]
  }
];
