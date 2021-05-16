import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { Usuario, Pais, Estado, Cidade } from './../core/model';

@Injectable()
export class UsuarioService {

  usuariosUrl: string;

  constructor(private http: HttpClient) {
    this.usuariosUrl = `${environment.apiUrl}/usuarios`;
  }

  listarPaises(): Promise<Pais[]> {
    return this.http.get<Pais[]>(`${this.usuariosUrl}/paises`).toPromise();
  }

  pesquisarEstados(pais): Promise<Estado[]> {
    const params = new HttpParams()
      .set('pais', pais);

    return this.http.get<Estado[]>(`${this.usuariosUrl}/estados`, { params }).toPromise();
  }

  pesquisarCidades(estado): Promise<Cidade[]> {
    const params = new HttpParams()
      .set('estado', estado);

    return this.http.get<Cidade[]>(`${this.usuariosUrl}/cidades`, { params }).toPromise();
  }

  adicionar(usuario: Usuario): Promise<Usuario> {
    return this.http.post<Usuario>(this.usuariosUrl, usuario).toPromise();
  }

}
