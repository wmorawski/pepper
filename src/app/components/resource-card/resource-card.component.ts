import { Component, input, InputSignal } from '@angular/core';
import { Resource } from '../../types/resource.types';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { KeyToLabelPipe } from '../../pipes/key-to-label.pipe';

@Component({
  selector: 'app-resource-card',
  standalone: true,
  imports: [MatCard, MatCardTitle, MatCardContent, MatDivider, KeyToLabelPipe],
  templateUrl: './resource-card.component.html',
  styleUrl: './resource-card.component.scss',
})
export class ResourceCardComponent {
  public resource: InputSignal<Resource> = input.required();
  public properties: InputSignal<string[]> = input.required();
}
