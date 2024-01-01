import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appLabel]',
  standalone: true,
})
export class LabelDirective {
  @HostBinding('class') class =
    'mb-2 block text-sm font-medium leading-6 text-gray-900';
}
