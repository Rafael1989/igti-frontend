import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { Prato } from './../../core/model';
import { PratoService } from './../prato.service';

@Component({
  selector: 'app-prato-cadastro',
  templateUrl: './prato-cadastro.component.html',
  styleUrls: ['./prato-cadastro.component.css']
})
export class PratoCadastroComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private pratoService: PratoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();

    const codigoPrato = this.route.snapshot.params['codigo'];

    this.title.setTitle('Cadastro de Pratos');

    if (codigoPrato) {
      this.carregarPrato(codigoPrato);
    }

  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      descricao: [null, this.validarObrigatoriedade],
      status: [],
      valor: [ null, Validators.required ],
      quantidade: [ null, Validators.required ]
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  carregarPrato(codigo: number) {
    this.pratoService.buscarPorCodigo(codigo)
      .then(prato => {
        this.formulario.patchValue(prato);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarPrato();
    } else {
      this.adicionarPrato();
    }
  }

  adicionarPrato() {
    this.pratoService.adicionar(this.formulario.value)
      .then(pratoAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Prato adicionado com sucesso!' });

        this.router.navigate(['/pratos', pratoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPrato() {
    this.pratoService.atualizar(this.formulario.value)
      .then(prato => {
        this.formulario.patchValue(prato);

        this.messageService.add({ severity: 'success', detail: 'Prato alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo() {
    this.formulario.reset();

    setTimeout(function() {
      this.prato = new Prato();
    }.bind(this), 1);

    this.router.navigate(['/pratos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Pratos: ${this.formulario.get('descricao').value}`);
  }

}
