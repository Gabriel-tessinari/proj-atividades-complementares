import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificadosAlunoComponent } from './certificados-aluno/certificados-aluno.component';
import { CertificadosComponent } from './certificados/certificados.component';

const routes: Routes = [
  { path: '', component: CertificadosComponent },
  { path: 'aluno', component: CertificadosAlunoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
