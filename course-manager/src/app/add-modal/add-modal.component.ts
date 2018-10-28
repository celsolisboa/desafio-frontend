import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { Teacher } from '../teacher';
import { Room } from '../room';
import { TeacherService } from '../teacher.service';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {
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

  createId(): number { 
    return this.courses.length === 0 ? 1 : Math.max(...this.courses.map(course => parseInt(course.id))) + 1;
  }

  addCourse(name: string, selectedTeachers: HTMLOptionElement[], selectedRooms: HTMLOptionElement[], start: string, end: string): void {
    event.preventDefault();
    
    const teachers = this.teacherService.mapTeacher(selectedTeachers, this.teachers);
    const rooms = this.roomService.mapRoom(selectedRooms, this.rooms);

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

  inArray(item: any, list: any[]): boolean {
    return list.some(i => i.id === item.id);
  }

  getTeachers(): void {
    this.teacherService.getTeachers()
      .subscribe((teachers) => {
        this.teachers = teachers
      });
  }

  getRooms(): void {
    this.roomService.getRooms()
      .subscribe((rooms) => {
        this.rooms = rooms
      });
  }

}
