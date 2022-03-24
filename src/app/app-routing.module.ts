import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/cursos/cursos.module').then(m => m.CursosModule) },
  { path: 'certificados', loadChildren: () => import('./pages/adm/adm.module').then(m => m.AdmModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
