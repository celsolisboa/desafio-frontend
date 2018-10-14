import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {CreateCourse} from './create-course'
import {API} from '../API/api';


@Injectable({
  providedIn: 'root'
})
export class CreateCourseService {

  constructor( private http: HttpClient ) { }

  getProfessores(){
    return this.http.get<CreateCourse[]>(`${API}/professor`)
  }




}
