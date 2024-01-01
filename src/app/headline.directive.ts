import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appHeadline]',
  standalone: true,
})
export class HeadlineDirective {
  @HostBinding('class') class = 'text-2xl font-medium';
}
