import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {

  protected UrlService = 'http://localhost:3000/api/';


  
  public obterUsuario() {
    return JSON.parse(localStorage.getItem('eio.usuario'));
  }

}
