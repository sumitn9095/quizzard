import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserscoreComponent } from './userscore.component';
import { SharedModule as appShared } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: UserscoreComponent }];

@NgModule({
  declarations: [UserscoreComponent],
  imports: [CommonModule, RouterModule.forChild(routes), appShared.forChild()],
})
export class UserscoreModule {}
