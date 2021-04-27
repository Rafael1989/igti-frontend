import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

@Injectable()
export class PerfilService {

  perfisUrl: string;

  constructor(private http: HttpClient) {
    this.perfisUrl = `${environment.apiUrl}/perfis`;
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.perfisUrl).toPromise();
  }

}
