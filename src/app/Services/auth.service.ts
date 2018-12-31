import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auths: AngularFireAuth) { }

  signIn(empass: any) {
    return this.auths.auth.signInWithEmailAndPassword(empass.email, empass.pass);
  }

  signUp(empass: any) {
    return this.auths.auth.createUserWithEmailAndPassword(empass.email, empass.pass);
  }

  Logout() {
    return this.auths.auth.signOut();
  }
  getUser() {
    return this.auths.authState;
  }
}
