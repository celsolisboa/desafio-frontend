import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado : boolean = false;

  constructor( private router: Router) { }

  fazerLogin(usuario: Usuario){
    if( usuario.nome === 'usuario@email.com' && usuario.senha === '12345'){
        this.usuarioAutenticado = true;
        this.router.navigate(['courses'])
    }
    else{
      this.usuarioAutenticado = false;
    }
  }
}
