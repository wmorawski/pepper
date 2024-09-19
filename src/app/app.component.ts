import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Store} from "@ngxs/store";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatDivider],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pepper';

  public scores = this.store.selectSignal(state => state.scoreboard.scores)

  public constructor(private store: Store) {
  }
}
