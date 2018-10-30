import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { Teacher } from '../teacher';
import { Room } from '../room';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public courses: Course[];
  public teachers: Teacher[];
  public rooms: Room[];
  public showAddCourse = false;
  public selectedCourse: Course;

  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses()
      .subscribe((response) => {
        this.courses = response.cursos
      });
  }

  selectCourse(course: Course): void {
    this.selectedCourse = course;
  }

  deleteCourse(courseId: string): void {
    this.courses = this.courses.filter(courseItem => courseItem.id !== courseId);
    this.courseService.deleteCourse(courseId).subscribe();
  }

}
