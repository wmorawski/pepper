import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'keyToLabel',
  standalone: true,
})
export class KeyToLabelPipe implements PipeTransform {
  transform(value: string): string {
    const valueWithoutUnderscore = value.replaceAll('_', ' ');
    return valueWithoutUnderscore.slice(0, 1).toUpperCase() + valueWithoutUnderscore.slice(1);
  }
}
