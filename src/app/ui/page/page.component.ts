import { Component, Input } from '@angular/core';
import { TranslocoDirective } from '@ngneat/transloco';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [TranslocoDirective, RouterLink],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent {
  @Input({ required: true }) title = '';
  @Input() showBackButton = true;
  @Input() showSettingsButton = true;
}
