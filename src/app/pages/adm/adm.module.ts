import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { CertificadosComponent } from './certificados/certificados.component';


@NgModule({
  declarations: [CertificadosComponent],
  imports: [
    CommonModule,
    AdmRoutingModule
  ]
})
export class AdmModule { }
