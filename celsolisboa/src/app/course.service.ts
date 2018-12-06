import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CourseService {

  coursesUrl = 'http://localhost:3000/api/curso/';

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<any[]>(`${this.coursesUrl}`);
  }
}
