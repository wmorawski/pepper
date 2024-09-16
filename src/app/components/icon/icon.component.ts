import { Component, computed, input } from '@angular/core';

export const IconSize = {
  small: 16,
  medium: 24,
  large: 32
}

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css'
})
export class IconComponent {
  public name = input<string>();

  public size = input<keyof typeof IconSize>('medium')

  public sizeInPx = computed(() => `${IconSize[this.size()]}px`);
  public svgName = computed(() => `#${this.name()!}`);
}
