import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { NgbModalModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MainHeaderComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgbModalModule,
    NgbDropdownModule,
  ],
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
