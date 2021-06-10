import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { EntregadorService, PedidosFiltro } from '../entregador.service';

@Component({
  selector: 'app-pedidos-pesquisa',
  templateUrl: './pedidos-pesquisa.component.html',
  styleUrls: ['./pedidos-pesquisa.component.css']
})
export class EntregadorPedidosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PedidosFiltro();
  pedidos = [];
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
    this.title.setTitle('Pesquisa de pedidos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.entregadorService.pesquisarPedidos(this.filtro)
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

  confirmarEntrega(pedido: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja entregar?',
      accept: () => {
        this.entregar(pedido);
      }
    });
  }

  confirmarPagamento(pedido: any) {
    this.confirmation.confirm({
      message: 'A encomenda foi paga?',
      accept: () => {
        this.pagar(pedido);
      }
    });
  }

  entregar(pedido: any) {
    this.entregadorService.entregar(pedido)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.reset();
        }

        this.messageService.add({ severity: 'success', detail: 'Registro para entregar efetuado com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pagar(pedido: any) {
    this.entregadorService.pagar(pedido)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.reset();
        }

        this.messageService.add({ severity: 'success', detail: 'Pedido pago com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
