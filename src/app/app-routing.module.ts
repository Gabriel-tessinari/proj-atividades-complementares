import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmDefaultComponent } from './shared/layouts/adm-default/adm-default/adm-default.component';
import { AlunoDefaultComponent } from './shared/layouts/aluno-default/aluno-default/aluno-default.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule) },
  { path: '', component: AdmDefaultComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/adm/adm.module').then(m => m.AdmModule) }
    ]
  },
  { path: '', component: AlunoDefaultComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/aluno/aluno.module').then(m => m.AlunoModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
