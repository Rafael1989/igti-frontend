import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from '../../environments/environment';
import { Pedido, Prato, Usuario } from '../core/model';
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

export class AdminPedidosFiltro {
  codigo: number;
  pagina = 0;
  itensPorPagina = 5;
}

export class AdminVendasFiltro {
  codigo: number;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class AdminService {

  pratosUrl: string;
  usuariosUrl: string;
  pedidosUrl: string;
  vendasUrl: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.pratosUrl = `${environment.apiUrl}/admin/pratos`;
    this.usuariosUrl = `${environment.apiUrl}/admin/usuarios`;
    this.pedidosUrl = `${environment.apiUrl}/admin/pedidos`;
    this.vendasUrl = `${environment.apiUrl}/admin/vendas`;
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

  buscarPorCodigoPedido(codigo: number): Promise<Pedido> {
    return this.http.get<Pedido>(`${this.pedidosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const pedido = response;

        return pedido;
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

  atualizarPedido(pedido: Pedido): Promise<Pedido> {
    return this.http.put<Pedido>(`${this.pedidosUrl}/${pedido.codigo}`, pedido)
      .toPromise()
      .then(response => {
        const pedidoAlterado = response;

        return pedidoAlterado;
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

  pesquisarPedidos(filtro: AdminPedidosFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if (filtro.codigo) {
      params = params.set('codigo', ""+filtro.codigo);
    }

    return this.http.get(`${this.pedidosUrl}?resumo`, { params })
      .toPromise()
      .then(response => {
        const pedidos = response['content'];

        const resultado = {
          pedidos,
          total: response['totalElements']
        };

        return resultado;
      });
  }

  pesquisarVendas(filtro: AdminVendasFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    return this.http.get(`${this.vendasUrl}?resumo`, { params })
      .toPromise()
      .then(response => {
        const vendas = response['content'];

        const resultado = {
          vendas,
          total: response['totalElements']
        };

        return resultado;
      });
  }

}
