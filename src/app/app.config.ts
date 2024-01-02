import {
  APP_INITIALIZER,
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  importProvidersFrom,
  isDevMode,
  LOCALE_ID,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { dbConfig } from './db-config';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco, TranslocoService } from '@ngneat/transloco';
import { firstValueFrom } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { LanguageService } from './language.service';
import { provideNgIconsConfig } from '@ng-icons/core';

export function initializeApp(
  languageService: LanguageService,
  translocoService: TranslocoService
) {
  return function () {
    const lang = languageService.lang;
    translocoService.setActiveLang(lang);
    return firstValueFrom(translocoService.load(lang));
  };
}

registerLocaleData(localeDe, 'de');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom([NgxIndexedDBModule.forRoot(dbConfig)]),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'de'],
        defaultLang: 'en',
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [LanguageService, TranslocoService],
    },
    {
      provide: LOCALE_ID,
      useFactory: (languageService: LanguageService) => languageService.lang,
      deps: [LanguageService],
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useFactory: (languageService: LanguageService) =>
        languageService.localeCurrencyCode,
      deps: [LanguageService],
    },
    provideNgIconsConfig({
      size: '1.25em',
    }),
  ],
};
