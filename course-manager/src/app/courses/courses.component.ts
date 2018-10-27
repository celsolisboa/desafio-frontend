import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { Teacher } from '../teacher';
import { Room } from '../room';
import { extractDirectiveDef } from '@angular/core/src/render3/definition';

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
    return this.courses.length === 0 ? 1 : Math.max(...this.courses.map(course => parseInt(course.id))) + 1;
  }

  addCourse(name: string, selectedTeachers: HTMLOptionElement[], selectedRooms: HTMLOptionElement[], start: string, end: string): void {
    const teachers = this.mapTeacher(selectedTeachers);
    const rooms = this.mapRoom(selectedRooms);

    const newId = this.createId();
    const newCourse = {
      id: newId.toString(),
      nome: name,
      inicio: start,
      fim: end,
      salas: rooms,
      professores: teachers
    } as Course;

    this.courses.push(newCourse);
    this.courseService.addCourse(newCourse).subscribe();
  }

  selectCourse(course: Course): void {
    this.selectedCourse = course;
  }

  inArray(item: any, list: any[]): boolean {
    return list.some(i => i.id === item.id);
  }

  mapTeacher(selectedTeachers: HTMLOptionElement[]): Teacher[] {
    return Array.from(selectedTeachers).map(teacher => {
      return {
        id: parseInt(teacher.value),
        nome: this.teachers.find(teach => teach.id.toString() === teacher.value).nome
      }
    });
  }

  mapRoom(selectedRooms: HTMLOptionElement[]): Room[] {
    return Array.from(selectedRooms).map(room => {
      return {
        id: parseInt(room.value),
        sala: this.rooms.find(rm => rm.id.toString() === room.value).sala
      }
    });
  }

  editCourse(id: string, name: string, selectedTeachers: HTMLOptionElement[], selectedRooms: HTMLOptionElement[], start: string, end: string): void {
    const teachers = this.mapTeacher(selectedTeachers);
    const rooms = this.mapRoom(selectedRooms);

    const editedCourse = {
      id: id,
      nome: name,
      inicio: start,
      fim: end,
      salas: rooms,
      professores: teachers
    } as Course;

    this.courses = this.courses.map(course => (editedCourse.id === course.id) ? editedCourse : course);
    this.courseService.editCourse(editedCourse).subscribe();
  }

  deleteCourse(courseId: string): void {
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
