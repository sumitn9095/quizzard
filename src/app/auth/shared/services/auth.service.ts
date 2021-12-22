import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { User } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  constructor(
    public afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        if (user.emailVerified == true) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          let fff = localStorage.getItem('user');
          console.log(`${user} --- IS signed-in`);

          this.router.navigate(['../application/quizround/1']);
          return true;
        } else {
          localStorage.removeItem('user');
          this.router.navigate(['../auth/']);
          return false;
        }
      } else {
        localStorage.removeItem('user');
        this.router.navigate(['../auth/']);
        return false;
      }
    });
  }

  // Sign in with email/password
  signIn(email: any, password: any) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)

      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['../../../application/quizround/1']);
        });
        // this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  FacebookAuth() {
    return this.AuthLogin(new FacebookAuthProvider());
  }

  GithubAuth() {
    return this.AuthLogin(new GithubAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Sign up with email/password
  signUp(email: any, password: any) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user?.sendEmailVerification().then(() => {
          this.router.navigate(['../../../auth/verify']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign out
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('user_score');
      localStorage.removeItem('user_game_progress');
      this.router.navigate(['../../../auth']);
    });
  }
}
