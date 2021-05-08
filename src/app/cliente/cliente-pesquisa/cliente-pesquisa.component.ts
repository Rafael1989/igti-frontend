import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ClienteService, ClienteFiltro } from '../cliente.service';

@Component({
  selector: 'app-cliente-pesquisa',
  templateUrl: './cliente-pesquisa.component.html',
  styleUrls: ['./cliente-pesquisa.component.css']
})
export class ClientePesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ClienteFiltro();
  pratos = [];
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
    this.title.setTitle('Pesquisa de Pratos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.clienteService.pesquisar(this.filtro)
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

  confirmarCompra(prato: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja comprar?',
      accept: () => {
        this.comprar(prato);
      }
    });
  }

  comprar(prato: any) {
    if(prato.quantidade <= 0){
      this.messageService.add({ severity: 'error', detail: 'Não existem mais pratos disponíveis, tente amanhã.' });
    }
    this.clienteService.comprar(prato)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.reset();
        }

        this.messageService.add({ severity: 'success', detail: 'Compra efetuada com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
