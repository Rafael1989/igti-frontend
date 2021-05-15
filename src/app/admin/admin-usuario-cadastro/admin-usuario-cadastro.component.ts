import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { Usuario } from '../../core/model';
import { AdminService } from './../admin.service';
import { PerfilService } from '../../perfil/perfil.service';

@Component({
  selector: 'app-admin-usuario-cadastro',
  templateUrl: './admin-usuario-cadastro.component.html',
  styleUrls: ['./admin-usuario-cadastro.component.css']
})
export class AdminUsuarioCadastroComponent implements OnInit {

  perfis = [];
  formulario: FormGroup;

  constructor(
    private perfilService: PerfilService,
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

    const codigoUsuario = this.route.snapshot.params['codigo'];

    if (codigoUsuario) {
      this.carregarUsuario(codigoUsuario);
    }

    this.carregarPerfis();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      nome: [null, this.validarObrigatoriedade ],
      email: [null, this.validarObrigatoriedade ],
      senha: [null, this.validarObrigatoriedade ],
      cpf: [ null, this.validarObrigatoriedade ],
      perfil: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      })
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  carregarUsuario(codigo: number) {
    this.adminService.buscarPorCodigoUsuario(codigo)
      .then(usuario => {
        this.formulario.patchValue(usuario);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarUsuario();
    } 
  }

  atualizarUsuario() {
    this.adminService.atualizarUsuario(this.formulario.value)
      .then(usuario => {
        this.formulario.patchValue(usuario);

        this.messageService.add({ severity: 'success', detail: 'Prato alterado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Usuários: ${this.formulario.get('nome').value}`);
  }

  carregarPerfis() {
    return this.perfilService.listarTodas()
      .then(perfis => {
        this.perfis = perfis
          .map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
