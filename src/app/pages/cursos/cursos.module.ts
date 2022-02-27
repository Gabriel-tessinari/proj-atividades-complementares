import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos/cursos.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [CursosComponent],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,

    CursosRoutingModule
  ]
})
export class CursosModule { }
