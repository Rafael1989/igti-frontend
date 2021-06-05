import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../seguranca/auth.guard';
import { ClientePesquisaComponent } from './cliente-pesquisa/cliente-pesquisa.component';
import { ClienteCozinheiraPesquisaComponent } from './cliente-cozinheira-pesquisa/cliente-cozinheira-pesquisa.component';
import { ClientePedidosPesquisaComponent } from './cliente-pedidos-pesquisa/cliente-pedidos-pesquisa.component';
import { ClienteVendasPesquisaComponent } from './cliente-vendas-pesquisa/cliente-vendas-pesquisa.component';

const routes: Routes = [
  {
    path: 'cozinheiras/:codigo',
    component: ClientePesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CLIENTE'] }
  },
  {
    path: 'cozinheiras',
    component: ClienteCozinheiraPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CLIENTE'] }
  },
  {
    path: 'pedidos',
    component: ClientePedidosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CLIENTE'] }
  },
  {
    path: 'vendas',
    component: ClienteVendasPesquisaComponent,
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
