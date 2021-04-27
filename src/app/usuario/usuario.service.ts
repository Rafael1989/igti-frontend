import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { Usuario } from './../core/model';

@Injectable()
export class UsuarioService {

  usuariosUrl: string;

  constructor(private http: HttpClient) {
    this.usuariosUrl = `${environment.apiUrl}/usuarios`;
  }

  adicionar(usuario: Usuario): Promise<Usuario> {
    return this.http.post<Usuario>(this.usuariosUrl, usuario).toPromise();
  }

}
