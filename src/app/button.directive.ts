import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appButton]',
  standalone: true,
})
export class ButtonDirective {
  @Input() color: 'default' | 'primary' | 'success' | 'danger' = 'default';
  @Input() disabled = false;
  @HostBinding('class') get class() {
    let classNames = `${this.defaultClassNames}`;

    if (this.disabled) {
      classNames += ` ${this.disabledClassNames}`;
    }

    switch (this.color) {
      case 'primary':
        return (classNames +=
          ' border-blue-700 text-white bg-blue-700 shadow-sm hover:border-blue-600 hover:bg-blue-600 focus-visible:outline-blue-700');
      case 'danger':
        return (classNames +=
          ' border-red-600 text-white bg-red-600 shadow-sm hover:border-red-500 hover:bg-red-500 focus-visible:outline-red-600');
      case 'success':
        return (classNames +=
          ' border-green-600 text-white bg-green-600 shadow-sm hover:border-green-500 hover:bg-green-500 focus-visible:outline-green-600');
      default:
        return (classNames +=
          ' border-transparent text-gray-400 hover:border-transparent hover:text-gray-900 focus-visible:outline-slate-500');
    }
  }

  private readonly defaultClassNames =
    'inline-flex cursor-pointer items-center justify-center rounded-md border px-3 py-2 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
  private readonly disabledClassNames = 'pointer-events-none opacity-45';
}
