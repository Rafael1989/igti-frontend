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

@Injectable()
export class ClienteService {

  pratosUrl: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.pratosUrl = `${environment.apiUrl}/cliente/pratos`;
  }

  pesquisar(filtro: ClienteFiltro): Promise<any> {
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

  comprar(prato: Prato): Promise<Prato> {
    prato.status = "";
    prato.cliente = new Usuario();
    prato.cliente.codigo = this.auth.jwtPayload?.codigo;
    prato.cozinheira = new Usuario();
    return this.http.put<Prato>(`${this.pratosUrl}/${prato.codigo}`, prato)
      .toPromise()
      .then(response => {
        const pratoAlterado = response;

        return pratoAlterado;
      });
  }

}
