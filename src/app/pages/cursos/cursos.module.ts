import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos/cursos.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CursosService } from 'src/app/shared/services/cursos.service';


@NgModule({
  declarations: [CursosComponent],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,

    CursosRoutingModule
  ],
  providers: [
    CursosService
  ]
})
export class CursosModule { }
