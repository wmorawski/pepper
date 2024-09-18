import {Component, inject} from '@angular/core';
import confetti from 'canvas-confetti';
import {Resource} from "../../types/resource.types";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ResourceCardComponent} from "../../components/resource-card/resource-card.component";

@Component({
  selector: 'app-winner-dialog',
  standalone: true,
  imports: [
    ResourceCardComponent
  ],
  templateUrl: './winner-dialog.component.html',
  styleUrl: './winner-dialog.component.scss'
})
export class WinnerDialogComponent {
  readonly data = inject<{ resource: Resource, properties: string[] }>(MAT_DIALOG_DATA);

  public ngOnInit() {
    this.celebrate();
  }

  public celebrate() {
    const duration = 3000; // in milliseconds

    confetti({
      particleCount: 100,
      spread: 160,
      origin: {y: 0.6},
    });

    setTimeout(() => confetti.reset(), duration);
  }
}
