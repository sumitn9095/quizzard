import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './intro.component';
import { ModeComponent } from './mode/mode.component';
import { CategoryComponent } from './category/category.component';


const routes: Routes = [
  { path: '', component: IntroComponent }
];

@NgModule({
  declarations: [
    IntroComponent,
    ModeComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ModeComponent
  ]
})
export class IntroModule { }
