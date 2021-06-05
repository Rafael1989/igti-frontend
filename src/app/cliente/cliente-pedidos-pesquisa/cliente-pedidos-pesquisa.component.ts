import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ClienteService, ClientePedidosFiltro } from '../cliente.service';

@Component({
  selector: 'app-cliente-pedidos-pesquisa',
  templateUrl: './cliente-pedidos-pesquisa.component.html',
  styleUrls: ['./cliente-pedidos-pesquisa.component.css']
})
export class ClientePedidosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ClientePedidosFiltro();
  pedidos = [];
  @ViewChild('tabela') grid: Table;

  constructor(
    private clienteService: ClienteService,
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

    this.clienteService.pesquisarPedidos(this.filtro)
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
