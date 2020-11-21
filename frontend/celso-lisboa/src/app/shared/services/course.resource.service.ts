import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseResourceService {

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<any> {
    return this.http.get('http://localhost:3000/api/curso');
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/curso/${id}`);
  }
}
