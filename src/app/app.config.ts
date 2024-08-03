import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {provideClientHydration} from "@angular/platform-browser";
import {provideHttpClient} from "@angular/common/http";
import {environment} from "../environment/environment";
import {routes} from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), {
    provide: FIREBASE_OPTIONS,
    useValue: environment.firebaseConfig
  }, provideClientHydration(), provideHttpClient()],

};
