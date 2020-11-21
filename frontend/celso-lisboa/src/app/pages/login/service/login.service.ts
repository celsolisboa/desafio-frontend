import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {LoginModel} from '../models/login.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(valueForm: LoginModel): any {
    this.callApi(valueForm).subscribe(
      (response => {
        console.log(response);
        // mandar para outra url
        return false;
      }),
      (error => {
        console.log(error);
        return true;
      })
    );
  }

  callApi(valueForm: LoginModel): Observable<any> {
    return this.http.post('http://localhost:3000/api/user/login', valueForm);
  }
}
