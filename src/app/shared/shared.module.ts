import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MainHeaderComponent } from './components/main-header/main-header.component';

@NgModule({
  declarations: [MainHeaderComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [MainHeaderComponent],
})
export class SharedModule {
  static forChild(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
