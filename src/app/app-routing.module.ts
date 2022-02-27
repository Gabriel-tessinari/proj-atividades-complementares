import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursosModule } from './pages/cursos/cursos.module';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/cursos/cursos.module').then(m => m.CursosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
