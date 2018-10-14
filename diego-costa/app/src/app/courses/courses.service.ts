import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Curso } from './courses';
import {API} from '../API/api';
import { tap } from 'rxjs/operators';
// lembrar de criar a interface.model
@Injectable({
  providedIn: 'root'
})

export class CoursesService {

  constructor(private http: HttpClient) { }

  //método get de cursos
  getCursos(){
    return this.http.get<Curso[]>(`${API}/curso`)
  }

}
