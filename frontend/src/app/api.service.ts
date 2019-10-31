import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginResultadoModel} from './model/login-resultado-model'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  login(email: string, password: string): Observable<LoginResultadoModel>{
    return this.http.post<LoginResultadoModel>('http://localhost:3000/api/user/login', {
      email: email,
      password: password
    });
  }
}