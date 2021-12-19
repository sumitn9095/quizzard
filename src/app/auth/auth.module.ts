import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
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
];

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AuthModule {}
