import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { Teacher } from '../teacher';
import { Room } from '../room';
import { TeacherService } from '../teacher.service';
import { RoomService } from '../room.service';
import { SearchListService } from '../search-list.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {
  @Input() courses: Course[];
  public teachers: Teacher[];
  public rooms: Room[];
  public foundTeachers: Teacher[];
  public foundRooms: Room[];
  public focusedInput = false;
  public selectedTeachersList: Teacher[] = [];
  public focusedRoomInput = false;
  public selectedRoomsList: Room[] = [];

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
  }

  createId(): number {
    return this.courses.length === 0 ? 1 : Math.max(...this.courses.map(course => parseInt(course.id))) + 1;
  }

  addCourse(name: string, selectedTeachers: Teacher[], selectedRooms: Room[], start: string, end: string): void {
    event.preventDefault();

    const newId = this.createId();
    const newCourse = {
      id: newId.toString(),
      nome: name,
      inicio: start,
      fim: end,
      salas: selectedRooms,
      professores: selectedTeachers
    } as Course;

    this.courses.push(newCourse);
    this.courseService.addCourse(newCourse).subscribe(() => {
      this.closeModal();
    });
  }

  inArray(item: any, list: any[]): boolean {
    if (!list || list.length === 0) return false;
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

  closeModal(): void {
    this.close.emit(null);
  }

  clickTreatment(): void {
    if ((<HTMLDivElement>event.target).classList.contains('courses__modal')) {
      this.closeModal();
    }
  }

  onUpdateTeachers(list: Teacher[]): void {
    this.selectedTeachersList = list;
  }

  onUpdateRooms(list: Room[]): void {
    this.selectedRoomsList = list;
  }

}
