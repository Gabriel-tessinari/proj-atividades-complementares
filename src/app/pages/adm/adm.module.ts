import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdmRoutingModule } from './adm-routing.module';
import { TesteArqService } from 'src/app/shared/services/testeArq.service';
import { CertificadosComponent } from './certificados/certificados.component';
import { CertificadosAlunoComponent } from './certificados-aluno/certificados-aluno.component';
import { AtividadesComponent } from './atividades/atividades.component';
import { PontuacoesCursoComponent } from './pontuacoes-curso/pontuacoes-curso.component';


@NgModule({
  declarations: [
    CertificadosComponent,
    CertificadosAlunoComponent,
    AtividadesComponent,
    PontuacoesCursoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdmRoutingModule
  ],
  providers: [
    TesteArqService
  ]
})
export class AdmModule { }
