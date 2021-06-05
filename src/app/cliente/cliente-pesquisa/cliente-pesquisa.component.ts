import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';

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
  codigo: number;
  @ViewChild('tabela') grid: Table;

  constructor(
    private clienteService: ClienteService,
    public auth: AuthService,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Pratos');

    const codigoCozinheira = this.route.snapshot.params['codigo'];

    if (codigoCozinheira) {
      this.carregarPratos(0,codigoCozinheira);
    }
  }

  carregarPratos(pagina = 0, codigo: number) {
    this.codigo = codigo;
    this.filtro.pagina = pagina;
    this.clienteService.buscarPratosPorCodigoCozinheira(this.filtro, codigo)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.pratos = resultado.pratos;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.carregarPratos(pagina, this.codigo);
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
      console.log(this.carrinhoCompras);
      if (this.carrinhoCompras[i].codigo === prato.codigo) {
        alert("Esse prato já foi adicionado!");
        return;
      }
    }
    if(prato.quantidade == 0){
      alert("Favor adicionar pelo menos 1 prato.");
      return;
    }
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
          this.carregarPratos(0, this.codigo);
        } else {
          this.grid.reset();
        }

        this.carrinhoCompras = [];

        this.messageService.add({ severity: 'success', detail: 'Compra efetuada com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


}
