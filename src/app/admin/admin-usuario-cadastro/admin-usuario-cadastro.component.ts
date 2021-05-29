import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { AdminService } from './../admin.service';
import { PerfilService } from '../../perfil/perfil.service';
import { UsuarioService } from 'src/app/usuario/usuario.service';

@Component({
  selector: 'app-admin-usuario-cadastro',
  templateUrl: './admin-usuario-cadastro.component.html',
  styleUrls: ['./admin-usuario-cadastro.component.css']
})
export class AdminUsuarioCadastroComponent implements OnInit {

  perfis = [];
  paises = [];
  estados = [];
  cidades = [];
  formulario: FormGroup;
  paisSelecionado: number;
  estadoSelecionado: number;

  constructor(
    private perfilService: PerfilService,
    private adminService: AdminService,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();

    this.carregarPaises();

    const codigoUsuario = this.route.snapshot.params['codigo'];

    if (codigoUsuario) {
      this.carregarUsuario(codigoUsuario);
    }

    this.carregarPerfis();
  }

  carregarPaises() {
    this.usuarioService.listarPaises().then(lista => {
      this.paises = lista.map(pais => ({ label: pais.nome, value: pais.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarEstados(pais) {
    console.log(pais);
    this.usuarioService.pesquisarEstados(pais).then(lista => {
      this.estados = lista.map(estado => ({ label: estado.nome, value: estado.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCidades(estado) {
    this.usuarioService.pesquisarCidades(estado).then(lista => {
      this.cidades = lista.map(c => ({ label: c.nome, value: c.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
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
      }),
      cidade: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      bairro: [null, this.validarObrigatoriedade ],
      rua: [null, this.validarObrigatoriedade ],
      numero: [null, this.validarObrigatoriedade ],
      complemento: [null, this.validarObrigatoriedade ],
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
        this.carregarEstados(usuario.cidade.estado.pais.codigo);
        this.carregarCidades(usuario.cidade.estado.codigo);
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
