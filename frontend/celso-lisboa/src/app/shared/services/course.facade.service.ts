import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {CourseResourceService} from './course.resource.service';
import {Rooms} from '../models/courses.model';
import {SelectListModel} from '../../../../projects/ui/src/lib/form-controls/models/select-list.model';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CourseFacadeService {

  constructor(private courseResourceService: CourseResourceService) { }

  getAllCourses(): Observable<any> {
    return this.courseResourceService.getAllCourses();
  }

  deleteCourse(id: string): Observable<any> {
    return this.courseResourceService.deleteCourse(id);
  }

  getRooms(): Observable<any> {
    return this.courseResourceService.getRooms().pipe(
      map(this.adjustmentSelectRooms)
    );
  }

  getTeachers(): Observable<any> {
    return this.courseResourceService.getTeachers().pipe(
      map(this.adjustmentSelectTeachers)
    );
  }

  adjustmentSelectRooms(rooms): SelectListModel[] {
    const optionsList: any[] = [];
    rooms.forEach(room => {
      optionsList.push({label: room.sala, value: room.id});
    });
    return optionsList;
  }

  adjustmentSelectTeachers(teachers): SelectListModel[] {
    const optionsList: any[] = [];
    teachers.forEach(room => {
      optionsList.push({label: room.nome, value: room.id});
    });
    return optionsList;
  }
}
