import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { Teacher } from '../teacher';
import { Room } from '../room';
import { extractDirectiveDef } from '@angular/core/src/render3/definition';
import { SearchListService } from '../search-list.service';

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
  public foundTeachers: Teacher[];
  public focusedInput = false;
  public selectedTeachersList: Teacher[] = [];
  public foundRooms: Room[];
  public focusedRoomInput = false;
  public selectedRoomsList: Room[] = [];

  constructor(
    private courseService: CourseService,
    private searchListService: SearchListService
  ) { }

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
    event.preventDefault();
    
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
    event.preventDefault();
    
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
    this.courseService.editCourse(editedCourse).subscribe(() => {
      this.selectedCourse = null;
    });
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

  searchTeachers(searchTerm: string): void {
    this.foundTeachers = this.searchListService.searchList(searchTerm, this.teachers, ['id', 'nome']);
  }
  
  selectTeacher(id: string | number): void {
    if (!this.selectedTeachersList.some(teacher => teacher.id.toString() === id.toString())) {
      this.selectedTeachersList.push(this.teachers.find(teacher => teacher.id.toString() === id.toString()));
    }
  }
  
  unselectTeacher(id: string | number): void {
    this.selectedTeachersList = this.selectedTeachersList.filter(teacher => teacher.id.toString() !== id.toString());
  }
  
  toggleTeacher(id: string | number): void {
    if (!this.selectedTeachersList.some(teacher => teacher.id.toString() === id.toString())) {
      this.selectTeacher(id);
    } else {
      this.unselectTeacher(id);
    }
  }

  searchRooms(searchTerm: string): void {
    this.foundRooms = this.searchListService.searchList(searchTerm, this.rooms, ['id', 'sala']);
  }
  
  selectRoom(id: string | number): void {
    if (!this.selectedRoomsList.some(room => room.id.toString() === id.toString())) {
      this.selectedRoomsList.push(this.rooms.find(room => room.id.toString() === id.toString()));
    }
  }
  
  unselectRoom(id: string | number): void {
    this.selectedRoomsList = this.selectedRoomsList.filter(room => room.id.toString() !== id.toString());
  }
  
  toggleRoom(id: string | number): void {
    if (!this.selectedRoomsList.some(room => room.id.toString() === id.toString())) {
      this.selectRoom(id);
    } else {
      this.unselectRoom(id);
    }
  }

}
