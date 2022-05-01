import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtividadesComponent } from './atividades/atividades.component';
import { CertificadosAlunoComponent } from './certificados-aluno/certificados-aluno.component';
import { CertificadosComponent } from './certificados/certificados.component';

const routes: Routes = [
  { path: 'certificados', component: CertificadosComponent },
  { path: 'certificados/aluno', component: CertificadosAlunoComponent },
  { path: 'atividades', component: AtividadesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
