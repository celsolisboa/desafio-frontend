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

  getTeachers(): Observable<any> {
    return this.http.get('http://localhost:3000/api/professor');
  }

  getRooms(): Observable<any> {
    return this.http.get('http://localhost:3000/api/sala');
  }

  createCourse(courseValue): Observable<any> {
    return this.http.post('http://localhost:3000/api/curso', courseValue);
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/curso/${id}`);
  }
}
