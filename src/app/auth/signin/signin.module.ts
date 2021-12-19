import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin.component';


const routes: Routes = [
  { path: '', component: SigninComponent }
];

@NgModule({
  declarations: [
    SigninComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SigninModule { }
