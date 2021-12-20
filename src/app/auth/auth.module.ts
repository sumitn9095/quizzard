import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./signin/signin.module').then((m) => m.SigninModule),
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./signin/signin.module').then((m) => m.SigninModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: 'signout',
    loadChildren: () =>
      import('./signout/signout.module').then((m) => m.SignoutModule),
  },
  {
    path: 'verify',
    loadChildren: () =>
      import('./verify-email-address/verify-email-address.module').then(
        (m) => m.VerifyEmailAddressModule
      ),
  },
];

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AuthModule {}
