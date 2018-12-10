import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Curso, Professor, Sala } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends BaseService {

constructor(private http: HttpClient) { super();}

  obterListaDeCursos(): Observable<Curso[]> {
    return this.http
               .get<Curso[]>(this.UrlService + "curso")
               .pipe(map((data: any) => data.cursos));
  }

  obterTotalCurso(){
    return this.http
    .get(this.UrlService + "curso")
    .pipe(map((data: any) => data.cursos.length));
  }

  cadastrarCurso(curso: Curso): Observable<Curso> {
    return this.http
               .post<Curso>(this.UrlService + "curso", curso)
  }

  obterListaDeProfessores(): Observable<Professor[]> {
    return this.http
               .get<Professor[]>(this.UrlService + "professor");     
  }

  obterListaDeSalas(): Observable<Sala[]> {
    return this.http
               .get<Sala[]>(this.UrlService + "sala");      
  }

  excluirCurso(id: string): Observable<Curso>{
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*", 
    //     "Access-Control-Allow-Credentials": "true",
    //     "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    //     "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    //   })  
    // };

    // let id =  typeof curso === 'string' ? curso : curso.id;

    const url = `${this.UrlService}curso/${id}`;
    return this.http.delete<Curso>(url)
  }

}
