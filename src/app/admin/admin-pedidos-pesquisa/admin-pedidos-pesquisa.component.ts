import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { AdminService, AdminPedidosFiltro } from '../admin.service';

@Component({
  selector: 'app-admin-pedidos-pesquisa',
  templateUrl: './admin-pedidos-pesquisa.component.html',
  styleUrls: ['./admin-pedidos-pesquisa.component.css']
})
export class AdminPedidosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new AdminPedidosFiltro();
  pedidos = [];
  @ViewChild('tabela') grid: Table;

  constructor(
    private adminService: AdminService,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de pedidos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.adminService.pesquisarPedidos(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pedidos = resultado.pedidos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }


}
