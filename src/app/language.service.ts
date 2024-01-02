import { inject, Injectable } from '@angular/core';
import { getBrowserLang, TranslocoService } from '@ngneat/transloco';
import {
  FormStyle,
  getCurrencySymbol,
  getLocaleCurrencyCode,
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

  get localeCurrencyCode(): string {
    return getLocaleCurrencyCode(this.lang) as string;
  }

  get currencySymbol() {
    return getCurrencySymbol(this.localeCurrencyCode, 'wide');
  }

  private readonly translocoService = inject(TranslocoService);
}
