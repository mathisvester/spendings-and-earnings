import { inject, Injectable } from '@angular/core';
import { getBrowserLang, TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  get lang() {
    return getBrowserLang() ?? this.translocoService.getDefaultLang();
  }

  private readonly translocoService = inject(TranslocoService);
}
