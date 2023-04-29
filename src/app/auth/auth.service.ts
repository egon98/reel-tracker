import {Injectable, NgZone} from '@angular/core';
import { Subject } from "rxjs";
import { Router } from "@angular/router";

import { User } from "./user.model";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";

import firebase from "firebase/compat/app";
import auth = firebase.auth;
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  userData: any;
  socialUserData: any;
  user: any;

  constructor(
    public angularFireStore: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
    private router: Router,
    public ngZone: NgZone,
    public socialAuthService: SocialAuthService
  ) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', '');
        JSON.parse(localStorage.getItem('user') || '{}')
      }
      socialAuthService.authState.subscribe((socialUser) => {
        if(socialUser) {
          this.socialUserData = socialUser;
        }
      })
    })
  }

  SignIn(email:string, password:string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email,password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home'])
        });
        this.SetUserData(result.user);
      }).catch(() => {
        window.alert("Email or password not valid")
      })
  }

  SignUp(email:string, password:string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email,password)
      .then((result) => {
        this.SendVerificationEmail();
        this.SetUserData(result.user);
        this.LogOut();
        console.log(this.userData);
      }).catch((error) => {
        window.alert(error.message);
      })
  }

  SendVerificationEmail() {
    if(this.isAuth()) {
      return firebase.auth().currentUser?.sendEmailVerification()
        .then(() => {
          this.router.navigate(['emailverification']);
        })
    } else {
      return false;
    }
  }

  ResetPassword(resetPass:string) {
    return this.angularFireAuth.sendPasswordResetEmail(resetPass)
      .then(() => {
        window.alert('Email sent with the link to reset password');
      }).catch((error) => {
        window.alert(error);
      })
  }

  get isLoggedInAndEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user !== null && user.emailVerified !== false);
  }

AuthWithGoogle() {
    return this.AuthProvider(new auth.GoogleAuthProvider());
  }

  AuthWithFacebook() {
    return this.AuthProvider(new auth.FacebookAuthProvider());
  }

  AuthProvider(provider:any) {
    return this.angularFireAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error);
      })
  }

  SetUserData(user:any) {
    const userRef: AngularFirestoreDocument<any> = this.angularFireStore.doc(`users/${user.uid}`);
    const userData: User = {
      email: user.email,
      userId: user.uid,
      emailVerified: user.emailVerified
    }
    console.log(userData);
    return userRef.set(userData, {
      merge: true
    })

  }

  LogOut() {
   this.socialAuthService.signOut().then(() => {
      this.socialUserData = null;
    })
    return this.angularFireAuth.signOut().then(() => {
      this.userData = null;
      localStorage.removeItem('user');
      this.router.navigate(['signup']);
    })

  }

  isAuth() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.userId !== null;
  }

  getUser() {
    return {...this.user};
  }
}
