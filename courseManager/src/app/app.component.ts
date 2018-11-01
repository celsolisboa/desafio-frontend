import {Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'courseManager';
  logado = false;
  usuario = {
    email:'',
    senha:''
  }
  errorMessage = '';
  constructor(
    private http: HttpClient
  ){}

  postLogin(user){
    return this.http.post('http://localhost:3000/api/user/login', {
      email: user.email,
      password: user.senha
    })
  }

  ngOnInit() {

  }

  login(){
    if(!this.usuario.email){
      return this.errorMessage = "Email obrigatório!"
    }
    if(!this.usuario.senha){
      return this.errorMessage = "Senha obrigatória!"
    }
    this.postLogin(this.usuario).subscribe( data => {
      console.log(data)
      this.logado = true;
    }, error => {
      this.errorMessage = 'Acesso negado!'
      console.log(error)
    })
  }
}
