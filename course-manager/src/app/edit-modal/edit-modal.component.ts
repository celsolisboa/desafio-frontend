import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CourseService } from '../course.service';
import { TeacherService } from '../teacher.service';
import { RoomService } from '../room.service';
import { Course } from '../course';
import { Teacher } from '../teacher';
import { Room } from '../room';
import { SearchListService } from '../search-list.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  @Input() courses: Course[];
  @Input() selectedCourse: Course;
  public teachers: Teacher[];
  public rooms: Room[];
  public foundTeachers: Teacher[];
  public foundRooms: Room[];
  public selectedTeachersList: Teacher[];
  public selectedRoomsList: Room[];

  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(
    private courseService: CourseService,
    private teacherService: TeacherService,
    private roomService: RoomService,
    private searchListService: SearchListService
  ) { }

  ngOnInit() {
    this.getTeachers();
    this.getRooms();

    this.selectedTeachersList = this.selectedCourse.professores;
    this.selectedRoomsList = this.selectedCourse.salas;
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
      this.closeModal();
    });
  }

  inArray(item: any, list: any[]): boolean {
    if (!list || list.length === 0) return false;
    return list.some(i => i.id === item.id);
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

  searchTeachers(searchTerm: string): void {
    this.foundTeachers = this.searchListService.searchList(searchTerm, this.teachers, ['id', 'nome']);
  }

  searchRooms(searchTerm: string): void {
    this.foundRooms = this.searchListService.searchList(searchTerm, this.rooms, ['id', 'sala']);
  }

  selectTeacher(id: string | number): void {
    if (!this.selectedTeachersList.some(teacher => teacher.id.toString() === id.toString())) {
      this.selectedTeachersList.push(this.teachers.find(teacher => teacher.id.toString() === id.toString()));
    }
  }

  unselectTeacher(id: string | number): void {
    this.selectedTeachersList = this.selectedTeachersList.filter(teacher => teacher.id.toString() !== id.toString());
  }

  selectRoom(id: string | number): void {
    if (!this.selectedRoomsList.some(room => room.id.toString() === id.toString())) {
      this.selectedRoomsList.push(this.rooms.find(room => room.id.toString() === id.toString()));
    }
  }

  unselectRoom(id: string | number): void {
    this.selectedRoomsList = this.selectedRoomsList.filter(room => room.id.toString() !== id.toString());
  }

  toggleTeacher(id: string | number): void {
    if (!this.selectedTeachersList.some(teacher => teacher.id.toString() === id.toString())) {
      this.selectTeacher(id);
    } else {
      this.unselectTeacher(id);
    }
  }

  toggleRoom(id: string | number): void {
    if (!this.selectedRoomsList.some(room => room.id.toString() === id.toString())) {
      this.selectRoom(id);
    } else {
      this.unselectRoom(id);
    }
  }

  closeModal(): void {
    this.close.emit(null);
  }

  clickTreatment(): void {
    if ((<HTMLDivElement>event.target).classList.contains('courses__modal')) {
      this.closeModal();
    } else {
      if (!(<HTMLDivElement>event.target).classList.contains('teachers-options')) {
        this.foundTeachers = null;
      }
      if (!(<HTMLDivElement>event.target).classList.contains('rooms-options')) {
        this.foundRooms = null;
      }
    }
  }

}
