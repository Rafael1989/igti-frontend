import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { AdminService, AdminVendasFiltro } from '../admin.service';

@Component({
  selector: 'app-admin-vendas-pesquisa',
  templateUrl: './admin-vendas-pesquisa.component.html',
  styleUrls: ['./admin-vendas-pesquisa.component.css']
})
export class AdminVendasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new AdminVendasFiltro();
  vendas = [];
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
    this.title.setTitle('Pesquisa de vendas');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.adminService.pesquisarVendas(this.filtro)
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
