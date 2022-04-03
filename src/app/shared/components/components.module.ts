import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmHeaderComponent } from './adm-header/adm-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdmHeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [AdmHeaderComponent]
})
export class ComponentsModule { }
