import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PratoService, PedidosFiltro } from './../prato.service';

@Component({
  selector: 'app-pedidos-pesquisa',
  templateUrl: './pedidos-pesquisa.component.html',
  styleUrls: ['./pedidos-pesquisa.component.css']
})
export class PedidosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PedidosFiltro();
  pedidos = [];
  @ViewChild('tabela') grid: Table;

  constructor(
    private pratoService: PratoService,
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

    this.pratoService.pesquisarPedidos(this.filtro)
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

  confirmarPronto(pedido: any) {
    this.confirmation.confirm({
      message: 'O pedido está pronto para entrega?',
      accept: () => {
        this.pronto(pedido);
      }
    });
  }

  pronto(pedido: any) {
    this.pratoService.pronto(pedido)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.reset();
        }

        this.messageService.add({ severity: 'success', detail: 'Pedido está pronto para entrega com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


}
