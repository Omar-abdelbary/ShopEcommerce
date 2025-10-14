import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { headerInterceptor } from './core/interceptors/header.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { errorsInterceptor } from './core/interceptors/errors.interceptor';
import { NgxSpinner } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        headerInterceptor,
        loadingInterceptor,
        errorsInterceptor,
      ])
    ),
    provideAnimations(),
    provideToastr({
      progressBar: true, // شريط بيبين المدة المتبقية
      progressAnimation: 'decreasing', // طريقة حركة الشريط
    }),
    provideAnimationsAsync(),
    importProvidersFrom(NgxSpinner)
  ],
};
