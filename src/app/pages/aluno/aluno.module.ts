import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlunoRoutingModule } from './aluno-routing.module';
import { TesteArqService } from 'src/app/shared/services/testeArq.service';
import { AlunoAddHorasComponent } from './aluno-add-horas/aluno-add-horas.component';
import { AlunoViewHorasComponent } from './aluno-view-horas/aluno-view-horas.component';
import { AlunoEmptyComponent } from './aluno-empty/aluno-empty.component';


@NgModule({
  declarations: [
    AlunoAddHorasComponent,
    AlunoViewHorasComponent,
    AlunoEmptyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AlunoRoutingModule
  ],
  providers: [
    TesteArqService
  ]
})
export class AlunoModule { }
