import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../seguranca/auth.guard';
import { AdminPratoCadastroComponent } from './admin-prato-cadastro/admin-prato-cadastro.component';
import { AdminPratoPesquisaComponent } from './admin-prato-pesquisa/admin-prato-pesquisa.component';
import { AdminUsuarioCadastroComponent } from './admin-usuario-cadastro/admin-usuario-cadastro.component';
import { AdminUsuarioPesquisaComponent } from './admin-usuario-pesquisa/admin-usuario-pesquisa.component';

const routes: Routes = [
  {
    path: 'pratos',
    component: AdminPratoPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: 'pratos/:codigo',
    component: AdminPratoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: 'usuarios',
    component: AdminUsuarioPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  {
    path: 'usuarios/:codigo',
    component: AdminUsuarioCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
