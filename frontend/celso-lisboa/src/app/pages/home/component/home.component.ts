import { Component, OnInit } from '@angular/core';
import {CourseModel, CoursesModel} from '../../../shared/models/courses.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CourseFacadeService} from '../../../shared/services/course.facade.service';
import {SelectListModel} from '../../../../../projects/ui/src/lib/form-controls/models/select-list.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  courses: CourseModel[];
  formCourse: FormGroup;
  rooms: SelectListModel[] = [];
  teachers: SelectListModel[] = [];
  showModal = false;

  constructor(
    public courseFacadeService: CourseFacadeService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.courseFacadeService.getAllCourses().subscribe((courses: CoursesModel) => {
      this.courses = courses.cursos;
    });
    this.buildResourceForm();
  }

  private buildResourceForm(): void {
    this.formCourse = this.fb.group({
      courseName: [ null, [ Validators.required ] ],
      teacher: [ null, [ Validators.required ] ],
      rooms: [ null, [ Validators.required ] ],
      start: [ null, [ Validators.required ] ],
      end: [ null, [ Validators.required ] ],
    });
  }

  openModal(): void {
    this.showModal = true;
    this.courseFacadeService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
    });
    this.courseFacadeService.getTeachers().subscribe(teachers => {
      this.teachers = teachers;
    });
  }

  closeModal(): void {
    this.showModal = false;
  }

  addCourse(): void {
    this.closeModal();
    console.log('Salvou!');
  }

}
