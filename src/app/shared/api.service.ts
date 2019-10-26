import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { Usuario } from '../login/usuario';
import { Curso } from '../cursos/curso';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private usuarioAutenticado: boolean = false;
  postIdSource = new  BehaviorSubject<number>(0);
  constructor(private http: HttpClient, private router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  apiCursos = 'http://localhost:3000';

  login(email: string, password: string): Observable<any> {
    const url_api = this.apiCursos + '/api/user/login';
    return this.http.post<Usuario>(
      url_api,
      { email, password }
    ).pipe(
      map(data => {
        this.usuarioAutenticado = true;
      })
    );
  }
  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }

  getCursos(): Observable<Curso> {
    return this.http.get<Curso>(this.apiCursos + '/api/curso')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getCurso(id): Observable<Curso> {
    return this.http.get<Curso>(this.apiCursos + '/api/curso' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  atualizaCurso(id, curso): Observable<Curso> {
    return this.http.patch<Curso>(this.apiCursos + '/api/curso' + id, JSON.stringify(curso), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  criarCurso(curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiCursos + '/api/curso', JSON.stringify(curso), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getProfessores(): Observable<Curso> {
    return this.http.get<Curso>(this.apiCursos + '/api/professor')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getSalas(): Observable<Curso> {
    return this.http.get<Curso>(this.apiCursos + '/api/sala')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  deletaCurso(id) {
    return this.http.delete<Curso>(this.apiCursos + '/api/curso/:' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}

