import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { CertificadosComponent } from './certificados/certificados.component';
import { CertificadosAlunoComponent } from './certificados-aluno/certificados-aluno.component';


@NgModule({
  declarations: [
    CertificadosComponent,
    CertificadosAlunoComponent
  ],
  imports: [
    CommonModule,
    AdmRoutingModule
  ]
})
export class AdmModule { }
