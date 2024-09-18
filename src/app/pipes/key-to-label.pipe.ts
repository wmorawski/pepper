import { inject, Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Pipe({
  name: 'keyToLabel',
  standalone: true,
})
export class KeyToLabelPipe implements PipeTransform {
  transform(value: string): unknown {
    const titleCasePipe = inject(TitleCasePipe);
    return titleCasePipe.transform(value.replace('_', ''));
  }
}
