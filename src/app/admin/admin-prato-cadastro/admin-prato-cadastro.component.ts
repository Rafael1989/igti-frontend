import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { Prato } from '../../core/model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-prato-cadastro',
  templateUrl: './admin-prato-cadastro.component.html',
  styleUrls: ['./admin-prato-cadastro.component.css']
})
export class AdminPratoCadastroComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private adminService: AdminService,
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

    this.title.setTitle('Edição de Pratos');

    if (codigoPrato) {
      this.carregarPrato(codigoPrato);
    }

  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      descricao: [null, this.validarObrigatoriedade],
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
    this.adminService.buscarPorCodigo(codigo)
      .then(prato => {
        this.formulario.patchValue(prato);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarPrato();
    } 
  }

  atualizarPrato() {
    this.adminService.atualizar(this.formulario.value)
      .then(prato => {
        this.formulario.patchValue(prato);

        this.messageService.add({ severity: 'success', detail: 'Prato alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Pratos: ${this.formulario.get('descricao').value}`);
  }

}
