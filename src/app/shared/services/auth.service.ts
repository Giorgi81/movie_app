import {Injectable} from "@angular/core";
import {from, Observable, of} from "rxjs";
import firebase from "firebase/compat/app";
import UserCredential = firebase.auth.UserCredential;
import {GoogleAuthProvider} from 'firebase/auth';
import {getAuth, signInWithPopup} from "firebase/auth";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _error: any;
  private _auth: any;

  constructor(
    private afs: AngularFireAuth
  ) {
    this._auth = getAuth();
  }

  user(): Observable<UserCredential | any>  {
    return this.afs.authState;
  }

  register(email: string, password: string): Observable<UserCredential | any> {
    return from(this.afs.createUserWithEmailAndPassword(email, password));
  }

  login(email: string, password: string): Observable<UserCredential | any> {
    return from(this.afs.signInWithEmailAndPassword(email, password));
  }

  logOut() {
    localStorage.removeItem('user')
    this.afs.signOut();
  }

}
