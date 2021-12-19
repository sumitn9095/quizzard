import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SignoutComponent } from './signout.component';


const routes: Routes = [
  { path: '', component: SignoutComponent }
];

@NgModule({
  declarations: [
    SignoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SignoutModule { }
