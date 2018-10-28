import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { Teacher } from '../teacher';
import { Room } from '../room';
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
