import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmDefaultComponent } from './shared/layouts/adm-default/adm-default/adm-default.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/cursos/cursos.module').then(m => m.CursosModule) },
  { path: '', component: AdmDefaultComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/adm/adm.module').then(m => m.AdmModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
