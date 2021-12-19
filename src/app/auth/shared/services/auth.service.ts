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
        return fff != null ? JSON.parse(fff) : '';
      } else {
        localStorage.setItem('user', 'NONE');
        let fff = localStorage.getItem('user');
        return fff != null ? JSON.parse(fff) : '';
      }
    });
  }

  // Sign in with email/password
  SignIn(email: any, password: any) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
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
  SignUp(email: any, password: any) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        //this.SendVerificationMail();
        // this.SetUserData(result.user);
        result.user?.sendEmailVerification().then(() => {
          this.router.navigate(['verify-email-address']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  // SendVerificationMail() {
  //   return this.afAuth.currentUser.sendEmailVerification().then(() => {
  //     this.router.navigate(['verify-email-address']);
  //   });
  // }
}
