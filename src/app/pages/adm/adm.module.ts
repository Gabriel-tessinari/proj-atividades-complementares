import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { CertificadosComponent } from './certificados/certificados.component';
import { CertificadosAlunoComponent } from './certificados-aluno/certificados-aluno.component';
import { TesteArqService } from 'src/app/shared/services/testeArq.service';


@NgModule({
  declarations: [
    CertificadosComponent,
    CertificadosAlunoComponent
  ],
  imports: [
    CommonModule,
    AdmRoutingModule
  ],
  providers: [
    TesteArqService
  ]
})
export class AdmModule { }
