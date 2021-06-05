import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ClienteService, ClienteCozinheiraFiltro } from '../cliente.service';

@Component({
  selector: 'app-cliente-cozinheira-pesquisa',
  templateUrl: './cliente-cozinheira-pesquisa.component.html',
  styleUrls: ['./cliente-cozinheira-pesquisa.component.css']
})
export class ClienteCozinheiraPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ClienteCozinheiraFiltro();
  usuarios = [];
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
    this.title.setTitle('Pesquisa de Usuários');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.clienteService.pesquisarUsuario(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.usuarios = resultado.usuarios;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }


}
