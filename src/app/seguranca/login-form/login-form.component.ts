import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../auth.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha)
      .then(() => {
        if(this.auth.jwtPayload?.perfil == 2){
          this.router.navigate(['/pratos']);
        } else if(this.auth.jwtPayload?.perfil == 3){
          this.router.navigate(['/cliente/pratos']);
        } else if(this.auth.jwtPayload?.perfil == 4){
          this.router.navigate(['/entregador/pratos']);
        }else{
          this.router.navigate(['/admin/pratos']);
        }
        
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }

}
