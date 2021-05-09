import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from '../../environments/environment';
import { Prato, Usuario } from '../core/model';
import { AuthService } from '../seguranca/auth.service';

export class EntregadorFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class EntregadorService {

  pratosUrl: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.pratosUrl = `${environment.apiUrl}/entregador/pratos`;
  }

  pesquisar(filtro: EntregadorFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.pratosUrl}/resumir/${this.auth.jwtPayload?.codigo}?resumo`, { params })
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

  entregar(prato: Prato): Promise<Prato> {
    prato.status = "";
    prato.cliente = new Usuario();
    prato.cozinheira = new Usuario();
    prato.entregador = new Usuario();
    prato.entregador.codigo = this.auth.jwtPayload?.codigo;
    return this.http.put<Prato>(`${this.pratosUrl}/entregar/${prato.codigo}`, prato)
      .toPromise()
      .then(response => {
        const pratoAlterado = response;

        return pratoAlterado;
      });
  }

  pagar(prato: Prato): Promise<Prato> {
    prato.status = "";
    prato.cliente = new Usuario();
    prato.cozinheira = new Usuario();
    prato.entregador = new Usuario();
    prato.entregador.codigo = this.auth.jwtPayload?.codigo;
    return this.http.put<Prato>(`${this.pratosUrl}/pagar/${prato.codigo}`, prato)
      .toPromise()
      .then(response => {
        const pratoAlterado = response;

        return pratoAlterado;
      });
  }

}
