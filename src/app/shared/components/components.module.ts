import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmHeaderComponent } from './adm-header/adm-header.component';
import { RouterModule } from '@angular/router';
import { AlunoHeaderComponent } from './aluno-header/aluno-header.component';

@NgModule({
  declarations: [
    AdmHeaderComponent,
    AlunoHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AdmHeaderComponent,
    AlunoHeaderComponent
  ]
})
export class ComponentsModule { }