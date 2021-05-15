import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from '../../environments/environment';
import { Prato, Usuario } from '../core/model';
import { AuthService } from '../seguranca/auth.service';

export class AdminPratoFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

export class AdminUsuarioFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class AdminService {

  pratosUrl: string;
  usuariosUrl: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.pratosUrl = `${environment.apiUrl}/admin/pratos`;
    this.usuariosUrl = `${environment.apiUrl}/admin/usuarios`;
  }

  pesquisar(filtro: AdminPratoFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.pratosUrl}/resumir?resumo`, { params })
      .toPromise()
      .then(response => {
        const pratos = response['content'];

        const resultado = {
          pratos,
          total: response['totalElements']
        };

        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pratosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  atualizar(prato: Prato): Promise<Prato> {
    prato.cozinheira = new Usuario();
    prato.status = "";
    return this.http.put<Prato>(`${this.pratosUrl}/${prato.codigo}`, prato)
      .toPromise()
      .then(response => {
        const pratoAlterado = response;

        return pratoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Prato> {
    return this.http.get<Prato>(`${this.pratosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const prato = response;

        return prato;
      });
  }

  pesquisarUsuario(filtro: AdminUsuarioFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.usuariosUrl}/resumir?resumo`, { params })
      .toPromise()
      .then(response => {
        const usuarios = response['content'];

        const resultado = {
          usuarios,
          total: response['totalElements']
        };

        return resultado;
      });
  }

  excluirUsuario(codigo: number): Promise<void> {
    return this.http.delete(`${this.usuariosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  atualizarUsuario(usuario: Usuario): Promise<Usuario> {
    return this.http.put<Usuario>(`${this.usuariosUrl}/${usuario.codigo}`, usuario)
      .toPromise()
      .then(response => {
        const usuarioAlterado = response;

        return usuarioAlterado;
      });
  }

  buscarPorCodigoUsuario(codigo: number): Promise<Usuario> {
    return this.http.get<Usuario>(`${this.usuariosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const usuario = response;

        return usuario;
      });
  }

}
