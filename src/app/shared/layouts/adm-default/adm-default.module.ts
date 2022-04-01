import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdmDefaultComponent } from './adm-default/adm-default.component';
import { AdmModule } from 'src/app/pages/adm/adm.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AdmDefaultComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdmModule,
    ComponentsModule
  ]
})
export class AdmDefaultModule { }
