import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { Prato, Usuario } from './../core/model';
import { AuthService } from './../seguranca/auth.service';

export class PratoFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PratoService {

  pratosUrl: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.pratosUrl = `${environment.apiUrl}/pratos`;
  }

  pesquisar(filtro: PratoFiltro): Promise<any> {
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

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pratosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(prato: Prato): Promise<Prato> {
    prato.usuario = new Usuario();
    prato.usuario.codigo = this.auth.jwtPayload?.codigo;
    return this.http.post<Prato>(this.pratosUrl, prato)
      .toPromise();
  }

  atualizar(prato: Prato): Promise<Prato> {
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

}
