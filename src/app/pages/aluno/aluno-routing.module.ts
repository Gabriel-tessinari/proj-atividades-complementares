import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunoAddHorasComponent } from './aluno-add-horas/aluno-add-horas.component';
import { AlunoEmptyComponent } from './aluno-empty/aluno-empty.component';
import { AlunoViewHorasComponent } from './aluno-view-horas/aluno-view-horas.component';

const routes: Routes = [
  { path: 'aluno/add-horas', component: AlunoAddHorasComponent },
  { path: 'aluno/view-horas', component: AlunoViewHorasComponent },
  { path: 'aluno', component: AlunoEmptyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunoRoutingModule { }
