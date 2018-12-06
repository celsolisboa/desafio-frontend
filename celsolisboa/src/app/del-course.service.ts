import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DelCourseService {
  delUrl = "http://localhost:3000/api/curso/";

  constructor(private http: HttpClient) { }

  deleteUser(id){    
    return this.http.delete<any[]>(`${this.delUrl}`+id);
  }
}
