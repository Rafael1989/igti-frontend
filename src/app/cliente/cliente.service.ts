import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { Prato, Usuario } from './../core/model';
import { AuthService } from './../seguranca/auth.service';

export class ClienteFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

export class ClienteCozinheiraFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

export class ClientePedidosFiltro {
  codigo: number;
  pagina = 0;
  itensPorPagina = 5;
}

export class ClienteVendasFiltro {
  codigo: number;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class ClienteService {

  pratosUrl: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.pratosUrl = `${environment.apiUrl}/cliente/pratos`;
  }

  buscarPratosPorCodigoCozinheira(filtro: ClienteFiltro, codigo: number): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.pratosUrl}/resumir/${codigo}?resumo`, { params })
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

  comprar(pratos: Prato[]): Promise<Prato> {
    return this.http.put<Prato>(`${this.pratosUrl}/${this.auth.jwtPayload?.codigo}`, pratos)
      .toPromise()
      .then(response => {
        const pratoAlterado = response;

        return pratoAlterado;
      });
  }

  pesquisarUsuario(filtro: ClienteCozinheiraFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pratosUrl}/cozinheiras?resumo`, { params })
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

  pesquisarPedidos(filtro: ClientePedidosFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if (filtro.codigo) {
      params = params.set('codigo', ""+filtro.codigo);
    }

    return this.http.get(`${this.pratosUrl}/pedidos/${this.auth.jwtPayload?.codigo}?resumo`, { params })
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

  pesquisarVendas(filtro: ClienteVendasFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    return this.http.get(`${this.pratosUrl}/vendas/${this.auth.jwtPayload?.codigo}?resumo`, { params })
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
