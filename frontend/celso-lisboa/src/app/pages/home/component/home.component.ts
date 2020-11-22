import { Component, OnInit } from '@angular/core';
import {CourseModel, CoursesModel} from '../../../shared/models/courses.model';
import {CourseResourceService} from '../../../shared/services/course.resource.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  courses: CourseModel[];
  formCourse: FormGroup;
  showModal = false;

  constructor(
    public courseService: CourseResourceService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((courses: CoursesModel) => {
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
  }

  closeModal(): void {
    this.showModal = false;
  }

  addCourse(): void {
    this.closeModal();
    console.log('Salvou!');
  }

}
