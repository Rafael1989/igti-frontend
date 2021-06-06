import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { PratoCadastroComponent } from './prato-cadastro/prato-cadastro.component';
import { PratoPesquisaComponent } from './prato-pesquisa/prato-pesquisa.component';
import { PedidosPesquisaComponent } from './pedidos-pesquisa/pedidos-pesquisa.component';
import { VendasPesquisaComponent } from './vendas-pesquisa/vendas-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: PratoPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_COZINHEIRA'] }
  },
  {
    path: 'pedidos',
    component: PedidosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_COZINHEIRA'] }
  },
  {
    path: 'vendas',
    component: VendasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_COZINHEIRA'] }
  },
  {
    path: 'novo',
    component: PratoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_COZINHEIRA'] }
  },
  {
    path: ':codigo',
    component: PratoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_COZINHEIRA'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PratoRoutingModule { }
