import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../seguranca/auth.guard';
import { EntregadorPedidosPesquisaComponent } from './pedidos-pesquisa/pedidos-pesquisa.component';
import { EntregadorVendasPesquisaComponent } from './vendas-pesquisa/vendas-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: EntregadorPedidosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ENTREGADOR'] }
  },
  {
    path: 'vendas',
    component: EntregadorVendasPesquisaComponent,
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
