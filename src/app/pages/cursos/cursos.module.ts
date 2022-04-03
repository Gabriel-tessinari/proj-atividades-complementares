import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos/cursos.component';
import { TesteArqService } from 'src/app/shared/services/testeArq.service';

@NgModule({
  declarations: [CursosComponent],
  imports: [
    CommonModule,
    CursosRoutingModule
  ],
  providers: [
    TesteArqService
  ]
})
export class CursosModule { }
