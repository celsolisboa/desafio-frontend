import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from '../course.service';
import { TeacherService } from '../teacher.service';
import { RoomService } from '../room.service';
import { Course } from '../course';
import { Teacher } from '../teacher';
import { Room } from '../room';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  @Input() courses: Course[];
  public teachers: Teacher[];
  public rooms: Room[];

  constructor(
    private courseService: CourseService,
    private teacherService: TeacherService,
    private roomService: RoomService
  ) { }

  ngOnInit() {
    this.getTeachers();
    this.getRooms();
  }

  editCourse(id: string, name: string, selectedTeachers: HTMLOptionElement[], selectedRooms: HTMLOptionElement[], start: string, end: string): void {
    event.preventDefault();
    
    const teachers = this.teacherService.mapTeacher(selectedTeachers, this.teachers);
    const rooms = this.roomService.mapRoom(selectedRooms, this.rooms);

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
      // this.selectedCourse = null;
    });
  }

  getRooms(): void {
    this.roomService.getRooms()
      .subscribe((rooms) => {
        this.rooms = rooms
      });
  }

  getTeachers(): void {
    this.teacherService.getTeachers()
      .subscribe((teachers) => {
        this.teachers = teachers
      });
  }

}
