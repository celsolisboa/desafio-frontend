import { Component, OnInit } from '@angular/core';
import {CourseModel, CoursesModel} from '../../../shared/models/courses.model';
import {CourseResourceService} from '../../../shared/services/course.resource.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  courses: CourseModel[];

  constructor(public courseService: CourseResourceService) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((courses: CoursesModel) => {
      this.courses = courses.cursos;
    });
  }

}
