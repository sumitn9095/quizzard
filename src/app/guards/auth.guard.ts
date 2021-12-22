import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard
  implements CanActivate, CanActivateChild, CanDeactivate<unknown>
{
  userData: any;
  constructor(private afAuth: AngularFireAuth, public _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        let fff = localStorage.getItem('user');
        console.log(`${user} --- IS signed-in`);
        //this._router.navigate(['../application']);
        return true;
      } else {
        localStorage.setItem('user', 'NONE');
        let fff = localStorage.getItem('user');
        console.log(`User IS NOT signed-in`);
        this._router.navigate(['../auth/']);
        return false;
      }
    });

    return true;
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        if (user.emailVerified == true) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          let fff = localStorage.getItem('user');
          console.log(`${user} --- IS signed-in`);
          this._router.navigate(['../application']);
          return true;
        } else {
          localStorage.removeItem('user');
          this._router.navigate(['../auth/']);
          return false;
        }
      } else {
        localStorage.removeItem('user');
        this._router.navigate(['../auth/']);
        return false;
      }
    });

    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}
