import { Injectable, NgZone } from '@angular/core';
import { Auth } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        let fff = localStorage.getItem('user');
        console.log(`${user} --- IS signed-in`);
        return fff || fff != null ? JSON.parse(fff) : '';
      } else {
        localStorage.removeItem('user');
        // let fff = localStorage.getItem('user');
        console.log(`User IS NOT signed-in`);
        // return fff || fff != null ? JSON.parse(fff) : '';
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
        this.SetUserData(result.user);
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
    };
    return userRef.set(userData, {
      merge: true,
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
