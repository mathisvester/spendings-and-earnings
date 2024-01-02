import { inject, Injectable } from '@angular/core';
import { getBrowserLang, TranslocoService } from '@ngneat/transloco';
import {
  FormStyle,
  getLocaleMonthNames,
  TranslationWidth,
} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  get lang() {
    return getBrowserLang() ?? this.translocoService.getDefaultLang();
  }

  get localeMonthNames() {
    return getLocaleMonthNames(
      this.lang,
      FormStyle.Format,
      TranslationWidth.Wide
    );
  }

  private readonly translocoService = inject(TranslocoService);
}
