import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Curso } from './courses';
import {API} from '../API/api';

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
    return this.http.delete<Curso[]>(`${API}/curso/${id}`)
  }
}
