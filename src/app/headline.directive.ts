import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appHeadline]',
  standalone: true,
})
export class HeadlineDirective {
  @HostBinding('class') class = 'mb-4 text-2xl font-medium';
}
