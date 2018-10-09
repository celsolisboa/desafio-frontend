import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Curso } from './curso';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CursoService {

  data: Object;

  //url do curso
  private cursoUrl = 'http://localhost:3000/api/curso';

  constructor(public http: HttpClient) {}


  getCursos(){
    return this.http.get<Curso[]>(this.cursoUrl).
    pipe(
      tap(console.log)
    );
  }

}
