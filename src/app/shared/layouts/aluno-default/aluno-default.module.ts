import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlunoDefaultComponent } from './aluno-default/aluno-default.component';
import { AlunoModule } from 'src/app/pages/aluno/aluno.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [AlunoDefaultComponent],
  imports: [
    CommonModule,
    RouterModule,
    AlunoModule,
    ComponentsModule
  ]
})
export class AlunoDefaultModule { }