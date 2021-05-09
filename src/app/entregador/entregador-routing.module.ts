import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../seguranca/auth.guard';
import { EntregadorPesquisaComponent } from './entregador-pesquisa/entregador-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: EntregadorPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ENTREGADOR'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EntregadorRoutingModule { }
