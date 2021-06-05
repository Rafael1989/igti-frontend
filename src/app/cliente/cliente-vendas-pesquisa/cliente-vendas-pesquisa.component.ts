import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ClienteService, ClienteVendasFiltro } from '../cliente.service';

@Component({
  selector: 'app-cliente-vendas-pesquisa',
  templateUrl: './cliente-vendas-pesquisa.component.html',
  styleUrls: ['./cliente-vendas-pesquisa.component.css']
})
export class ClienteVendasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ClienteVendasFiltro();
  vendas = [];
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
    this.title.setTitle('Pesquisa de vendas');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.clienteService.pesquisarVendas(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.vendas = resultado.vendas;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }


}
