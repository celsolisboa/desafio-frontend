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

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.getCourses();
    this.getTeachers();
    this.getRooms();
  }

  getCourses(): void {
    this.courseService.getCourses()
      .subscribe((response) => {
        this.courses = response.cursos
      });
  }

  createId(): number { 
    return Math.max(...this.courses.map(course => course.id)) + 1;
  }

  addCourse(name: string, selectedTeachers: HTMLOptionElement[], selectedRooms: HTMLOptionElement[], start: string, end: string): void {
    const teachers = Array.from(selectedTeachers).map(teacher => {
      return {
        id: parseInt(teacher.value),
        nome: this.teachers.find(teach => teach.id.toString() === teacher.value).nome
      }
    });
    const rooms = Array.from(selectedRooms).map(room => {
      return {
        id: parseInt(room.value),
        sala: this.rooms.find(rm => rm.id.toString() === room.value).sala
      }
    });

    const newId = this.createId();
    const newCourse = {
      id: newId,
      nome: name,
      inicio: start,
      fim: end,
      salas: rooms,
      professores: teachers
    } as Course;

    this.courses.push(newCourse);
    this.courseService.addCourse(newCourse).subscribe();
  }

  deleteCourse(courseId: number): void {
    this.courses = this.courses.filter(courseItem => courseItem.id !== courseId);
    this.courseService.deleteCourse(courseId).subscribe();
  }

  getTeachers(): void {
    this.courseService.getTeachers()
      .subscribe((teachers) => {
        this.teachers = teachers
      });
  }

  getRooms(): void {
    this.courseService.getRooms()
      .subscribe((rooms) => {
        this.rooms = rooms
      });
  }

}
