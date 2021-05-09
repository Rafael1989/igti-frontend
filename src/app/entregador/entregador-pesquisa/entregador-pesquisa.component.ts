import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { EntregadorService, EntregadorFiltro } from '../entregador.service';

@Component({
  selector: 'app-entregador-pesquisa',
  templateUrl: './entregador-pesquisa.component.html',
  styleUrls: ['./entregador-pesquisa.component.css']
})
export class EntregadorPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new EntregadorFiltro();
  pratos = [];
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
    this.title.setTitle('Pesquisa de Pratos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.entregadorService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pratos = resultado.pratos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarEntrega(prato: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja entregar?',
      accept: () => {
        this.entregar(prato);
      }
    });
  }

  confirmarPagamento(prato: any) {
    this.confirmation.confirm({
      message: 'A encomenda foi paga?',
      accept: () => {
        this.pagar(prato);
      }
    });
  }

  entregar(prato: any) {
    this.entregadorService.entregar(prato)
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

  pagar(prato: any) {
    this.entregadorService.pagar(prato)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.reset();
        }

        this.messageService.add({ severity: 'success', detail: 'Prato pago com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
