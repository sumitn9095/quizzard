import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationComponent } from './application.component';

const routes: Routes = [
  {
    path: 'quizround',
    loadChildren: () =>
      import('./quizround/quizround.module').then((m) => m.QuizroundModule),
  },
  {
    path: 'quizround/:num',

    loadChildren: () =>
      import('./quizround/quizround.module').then((m) => m.QuizroundModule),
  },
  {
    path: 'userscore',
    loadChildren: () =>
      import('./userscore/userscore.module').then((m) => m.UserscoreModule),
  },
  {
    path: 'userProfile',
    loadChildren: () =>
      import('./user-profile/user-profile.module').then(
        (m) => m.UserProfileModule
      ),
  },
];

@NgModule({
  declarations: [ApplicationComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ApplicationModule {}
