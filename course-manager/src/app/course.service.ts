import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Course } from './course';
import { tap, catchError } from 'rxjs/operators';
import { Teacher } from './teacher';
import { Room } from './room';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseUrl = 'http://localhost:3000/api/curso'
  private teacherUrl = 'http://localhost:3000/api/professor'
  private roomUrl = 'http://localhost:3000/api/sala'

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any> {
    return this.http.get<any>(this.courseUrl)
      .pipe(
        tap((response: any) => this.log(`fetched ${response.cursos.length} course${response.cursos.length === 1 ? '' : 's'}`)),
        catchError(this.handleError<any>('getCourses'))
      );
  }

  addCourse(course: Course): Observable<any> {
    return this.http.post<any>(this.courseUrl, course, httpOptions)
      .pipe(
        tap(() => this.log(`added course id=${course.id}`)),
        catchError(this.handleError<any>('addCourse'))
      );
  }

  editCourse(course: Course): Observable<any> {
    const patchUrl = `${this.courseUrl}/${course.id}`;
    return this.http.patch<any>(patchUrl, course, httpOptions)
      .pipe(
        tap(() => this.log(`edited course id=${course.id}`)),
        catchError(this.handleError<any>('editCourse'))
      );
  }

  deleteCourse(course: Course | string): Observable<any> {
    const id = typeof course === 'string' ? course : course.id;
    const deleteUrl = `${this.courseUrl}/${id}`;

    return this.http.delete<any>(deleteUrl, httpOptions)
      .pipe(
        tap(() => this.log(`deleted course id=${id}`)),
        catchError(this.handleError<any>('deleteCourse'))
      );
  }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.teacherUrl)
      .pipe(
        tap((teachers: Teacher[]) => this.log(`fetched ${teachers.length} teacher${teachers.length === 1 ? '' : 's'}`)),
        catchError(this.handleError<Teacher[]>('getTeachers'))
      )
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomUrl)
      .pipe(
        tap((rooms: Room[]) => this.log(`fetched ${rooms.length} room${rooms.length === 1 ? '' : 's'}`)),
        catchError(this.handleError<Room[]>('getTeachers'))
      )
  }
  
  private log(message: string) {
    console.log(message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
