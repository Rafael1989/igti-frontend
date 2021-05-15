import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes: Routes = [
  { path: 'usuarios', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'pratos', loadChildren: () => import('./cozinheira/prato.module').then(m => m.PratoModule) },
  { path: 'cliente/pratos', loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule) },
  { path: 'entregador/pratos', loadChildren: () => import('./entregador/entregador.module').then(m => m.EntregadorModule) },

  { path: '', redirectTo: 'pratos', pathMatch: 'full' },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
