import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpRoutingModule } from './exp-routing.module';
import { ExpComponent } from './exp.component';
import { Test1Component } from './test1/test1.component';


@NgModule({
  declarations: [
    ExpComponent,
    Test1Component
  ],
  imports: [
    CommonModule,
    ExpRoutingModule
  ],
  exports: [Test1Component]
})
export class ExpModule { }
