import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { AdminService, AdminPratoFiltro } from '../admin.service';

@Component({
  selector: 'app-admin-prato-pesquisa',
  templateUrl: './admin-prato-pesquisa.component.html',
  styleUrls: ['./admin-prato-pesquisa.component.css']
})
export class AdminPratoPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new AdminPratoFiltro();
  pratos = [];
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
    this.title.setTitle('Pesquisa de Pratos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.adminService.pesquisar(this.filtro)
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

  confirmarExclusao(prato: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(prato);
      }
    });
  }

  excluir(prato: any) {
    this.adminService.excluir(prato.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.reset();
        }

        this.messageService.add({ severity: 'success', detail: 'Prato excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
