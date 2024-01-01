import { Component, Input } from '@angular/core';
import { TranslocoDirective } from '@ngneat/transloco';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeft, heroCog6Tooth } from '@ng-icons/heroicons/outline';
import { ButtonDirective } from '../button.directive';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [TranslocoDirective, NgIcon, RouterLink, ButtonDirective],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  providers: provideIcons({ heroArrowLeft, heroCog6Tooth }),
})
export class PageComponent {
  @Input({ required: true }) title = '';
  @Input() showBackButton = true;
}
