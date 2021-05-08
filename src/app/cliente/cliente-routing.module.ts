import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../seguranca/auth.guard';
import { ClientePesquisaComponent } from './cliente-pesquisa/cliente-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: ClientePesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CLIENTE'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
