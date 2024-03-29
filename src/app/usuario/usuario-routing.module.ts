import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioCadastroComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
