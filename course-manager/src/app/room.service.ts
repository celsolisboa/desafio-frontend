import { Injectable } from '@angular/core';
import { Room } from './room';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomUrl = 'http://localhost:3000/api/sala'

  constructor(private http: HttpClient) { }

  mapRoom(selectedRooms: HTMLOptionElement[], rooms: Room[]): Room[] {
    return Array.from(selectedRooms).map(room => {
      return {
        id: parseInt(room.value),
        sala: rooms.find(rm => rm.id.toString() === room.value).sala
      }
    });
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
