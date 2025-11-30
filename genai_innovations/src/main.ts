import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { tokenInterceptor } from './app/token.interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

bootstrapApplication(App,  {
  providers: [
     provideRouter(routes),
     provideHttpClient(withInterceptors([tokenInterceptor])),
     provideCharts(withDefaultRegisterables())
  ]})
  .catch((err) => console.error(err));
