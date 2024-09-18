import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { allowedResources } from '../../utils/resource.utils';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, RouterLink],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss',
})
export class PlayComponent {
  public readonly allowedResources = allowedResources;
}
