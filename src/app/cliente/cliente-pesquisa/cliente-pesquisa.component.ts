import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

import { AuthService } from '../../seguranca/auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ClienteService, ClienteFiltro } from '../cliente.service';
import { Prato, Usuario } from './../../core/model';
import { GalleriaThumbnails } from 'primeng';

@Component({
  selector: 'app-cliente-pesquisa',
  templateUrl: './cliente-pesquisa.component.html',
  styleUrls: ['./cliente-pesquisa.component.css']
})
export class ClientePesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ClienteFiltro();
  pratos = [];
  carrinhoCompras = [];
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

  adicionarQuantidade(prato) {
    prato.quantidade++;
  }

  removerQuantidade(prato) {
    if(prato.quantidade > 0){
      prato.quantidade--;
    }
  }

  adicionar(prato: any) {
    for(var i = 0; i < this.carrinhoCompras.length; i++) {
      if (this.carrinhoCompras[i].codigo === prato.codigo) {
          alert("Esse prato já foi adicionado!");
          return;
      }
    }
    if(prato.quantidade == 0){
      alert("Favor adicionar pelo menos 1 prato.");
      return;
    }
    prato.status = "";
    prato.cozinheira = new Usuario();
    this.carrinhoCompras.push(prato);
    this.messageService.add({ severity: 'success', detail: 'Prato adicionado ao carrinho de compras!' });
  }

  remover(prato: any) {
    this.carrinhoCompras.splice(prato);
    this.messageService.add({ severity: 'success', detail: 'Prato retirado ao carrinho de compras!' });
  }

  confirmarCompra() {
    if(this.carrinhoCompras.length === 0){
      alert("Favor adicionar pelo menos 1 prato");
      return;
    }
    this.confirmation.confirm({
      message: 'Tem certeza que deseja comprar?',
      accept: () => {
        this.comprar();
      }
    });
  }

  comprar() {
    this.clienteService.comprar(this.carrinhoCompras)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.reset();
        }

        this.carrinhoCompras = [];

        this.messageService.add({ severity: 'success', detail: 'Compra efetuada com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


}
