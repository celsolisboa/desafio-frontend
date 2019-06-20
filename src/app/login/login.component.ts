import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../shared/api.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor( private apiService: ApiService, private router: Router) { }

  ngOnInit() {
  }

  fazerLogin() {
      return this.apiService
        .login(this.usuario.email, this.usuario.password)
        .subscribe(data => {
          this.router.navigate(['/cursos']);
        },
          data => {
            alert('Email ou Senha Inválido!');
          });
    }
}
