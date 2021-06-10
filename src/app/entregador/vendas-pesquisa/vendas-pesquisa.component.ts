import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { EntregadorService, VendasFiltro } from '../entregador.service';

@Component({
  selector: 'app-vendas-pesquisa',
  templateUrl: './vendas-pesquisa.component.html',
  styleUrls: ['./vendas-pesquisa.component.css']
})
export class EntregadorVendasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new VendasFiltro();
  vendas = [];
  @ViewChild('tabela') grid: Table;

  constructor(
    private entregadorService: EntregadorService,
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

    this.entregadorService.pesquisarVendas(this.filtro)
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
