import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  login(usuario: Usuario) {
    let response = this.http
        .post(this.UrlService + "user/login", usuario);
    return response;
  }

}
