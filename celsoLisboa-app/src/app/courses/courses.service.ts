import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Curso } from './courses';
import {API} from '../API/api';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
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

  deleteCourse(id: number){
    if(confirm('Deseja realmente deletar este curso!')){
      return this.http.delete<Curso[]>(`${API}/curso/${id}`)
    }

  }
}
