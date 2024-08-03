import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import * as firebase from 'firebase/app';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {AngularFireModule, FIREBASE_OPTIONS} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {environment} from "../../environment/environment";


firebase.initializeApp(environment.firebaseConfig)

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),

  ],
  providers: [
    AuthService,
  ]
})
export class AuthModule {
}
