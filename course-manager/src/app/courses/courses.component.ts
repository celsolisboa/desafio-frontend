import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public courses: Course[];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses()
      .subscribe((response) => {
        this.courses = response.cursos
      });
  }

  deleteCourse(courseId: number): void {
    this.courses = this.courses.filter(courseItem => courseItem.id !== courseId);
    this.courseService.deleteCourse(courseId).subscribe();
  }

}
