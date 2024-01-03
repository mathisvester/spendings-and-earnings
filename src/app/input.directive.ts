import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appInput]',
  standalone: true,
})
export class InputDirective {
  @HostBinding('class') class =
    'block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 bg-white appearance-none';
}
