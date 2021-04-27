import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { Usuario } from './../../core/model';
import { UsuarioService } from './../usuario.service';
import { PerfilService } from './../../perfil/perfil.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  perfis = [];
  formulario: FormGroup;

  constructor(
    private perfilService: PerfilService,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();

    this.carregarPerfis();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
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

  salvar() {
    this.adicionarUsuario();
  }

  adicionarUsuario() {
    this.usuarioService.adicionar(this.formulario.value)
      .then(usuarioAdicionado => {
        this.messageService.add({ severity: 'success', detail: `Usuário ${usuarioAdicionado.codigo} adicionado com sucesso!` });

        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPerfis() {
    return this.perfilService.listarTodas()
      .then(perfis => {
        this.perfis = perfis
          .map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo() {
    this.formulario.reset();

    setTimeout(function() {
      this.usuario = new Usuario();
    }.bind(this), 1);

    this.router.navigate(['/usuarios']);
  }

}
