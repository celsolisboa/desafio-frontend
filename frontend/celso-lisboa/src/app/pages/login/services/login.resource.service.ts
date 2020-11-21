import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {LoginModel} from '../models/login.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginResourceService {

  constructor(private http: HttpClient) { }

  login(valueForm: LoginModel): Observable<any> {
    return this.http.post('http://localhost:3000/api/user/login', valueForm);
  }
}
