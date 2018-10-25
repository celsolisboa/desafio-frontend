import { Injectable } from '@angular/core';
import { User } from './user';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:3000/api/user/login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User> {
    const requestBody = {
      email: email,
      password: password
    };

    return this.http.post<User>(this.loginUrl, requestBody, httpOptions)
      .pipe(
        tap((user: User) => this.log(`logged user with name=${user.firstName}`)),
        catchError(this.handleError<User>('login'))
      );
  }
  
  private log(message: string) {
    console.log(message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
