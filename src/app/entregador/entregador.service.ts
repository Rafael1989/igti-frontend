import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from '../../environments/environment';
import { Pedido, Prato, Usuario } from '../core/model';
import { AuthService } from '../seguranca/auth.service';

export class EntregadorFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

export class VendasFiltro {
  codigo: number;
  pagina = 0;
  itensPorPagina = 5;
}

export class PedidosFiltro {
  codigo: number;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class EntregadorService {

  pratosUrl: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.pratosUrl = `${environment.apiUrl}/entregador/pratos`;
  }

  pesquisarPedidos(filtro: PedidosFiltro): Promise<any> {
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

  entregar(pedido: Pedido): Promise<Pedido> {
    pedido.cliente = new Usuario();
    pedido.entregador = new Usuario();
    pedido.entregador.codigo = this.auth.jwtPayload?.codigo;
    return this.http.put<Pedido>(`${this.pratosUrl}/entregar/${pedido.codigo}/${this.auth.jwtPayload?.codigo}`, pedido)
      .toPromise()
      .then(response => {
        const pedidoAlterado = response;

        return pedidoAlterado;
      });
  }

  pagar(pedido: Pedido): Promise<Pedido> {
    pedido.cliente = new Usuario();
    pedido.entregador = new Usuario();
    pedido.entregador.codigo = this.auth.jwtPayload?.codigo;
    return this.http.put<Pedido>(`${this.pratosUrl}/pagar/${pedido.codigo}`, pedido)
      .toPromise()
      .then(response => {
        const pedidoAlterado = response;

        return pedidoAlterado;
      });
  }

  pesquisarVendas(filtro: VendasFiltro): Promise<any> {
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
