import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {
  isAllowedHostname,
  renderUnauthorizedHostPage,
} from './app/core/security/host-validation';

if (isAllowedHostname(window.location.hostname)) {
  bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
  );
} else {
  renderUnauthorizedHostPage();
}
