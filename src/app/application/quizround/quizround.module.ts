import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { QuizroundComponent } from './quizround.component';
import { OptionComponent } from './option/option.component';

import { SharedModule as appShared } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: QuizroundComponent }];

@NgModule({
  declarations: [QuizroundComponent, OptionComponent],
  imports: [CommonModule, RouterModule.forChild(routes), appShared.forChild()],

  exports: [OptionComponent],
})
export class QuizroundModule {}
