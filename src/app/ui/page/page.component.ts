import { Component, inject, Input } from '@angular/core';
import { TranslocoDirective } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeft, heroCog6Tooth } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [TranslocoDirective, ButtonComponent, NgIcon],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  providers: provideIcons({ heroArrowLeft, heroCog6Tooth }),
})
export class PageComponent {
  @Input({ required: true }) title = '';
  @Input() showBackButton = true;
  @Input() showSettingsButton = true;

  private readonly router = inject(Router);

  navigateToHome() {
    this.router.navigateByUrl('/home');
  }

  navigateToSettings() {
    this.router.navigateByUrl('/settings');
  }
}
