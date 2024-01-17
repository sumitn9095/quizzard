import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { QuizroundComponent } from './quizround.component';
import { OptionComponent } from './option/option.component';
import { QuizsetComponent } from './quizset/quizset.component';
import { SharedModule as appShared } from '../shared/shared.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
const routes: Routes = [{ path: '', component: QuizroundComponent }];

@NgModule({
  declarations: [QuizroundComponent, OptionComponent, QuizsetComponent],
  imports: [CommonModule, RouterModule.forChild(routes), appShared.forChild(), AngularFirestoreModule],
  exports: [OptionComponent, QuizsetComponent],
})
export class QuizroundModule {}
