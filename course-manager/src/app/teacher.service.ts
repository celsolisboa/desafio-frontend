import { Injectable } from '@angular/core';
import { Teacher } from './teacher';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private teacherUrl = 'http://localhost:3000/api/professor'

  constructor(private http: HttpClient) { }

  mapTeacher(selectedTeachers: HTMLOptionElement[], teachers: Teacher[]): Teacher[] {
    return Array.from(selectedTeachers).map(teacher => {
      return {
        id: parseInt(teacher.value),
        nome: teachers.find(teach => teach.id.toString() === teacher.value).nome
      }
    });
  }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.teacherUrl)
      .pipe(
        tap((teachers: Teacher[]) => this.log(`fetched ${teachers.length} teacher${teachers.length === 1 ? '' : 's'}`)),
        catchError(this.handleError<Teacher[]>('getTeachers'))
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
