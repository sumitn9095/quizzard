import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VerifyEmailAddressComponent } from './verify-email-address.component';

const routes: Routes = [{ path: '', component: VerifyEmailAddressComponent }];

@NgModule({
  declarations: [VerifyEmailAddressComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class VerifyEmailAddressModule {}
