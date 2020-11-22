import { Component, OnInit } from '@angular/core';
import {CourseModel, CoursesModel} from '../../../shared/models/courses.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CourseFacadeService} from '../../../shared/services/course.facade.service';
import {SelectListModel} from '../../../../../projects/ui/src/lib/form-controls/models/select-list.model';
import {Util} from '../../../shared/util/util';
import {ErrorMessageEnum} from '../../../shared/enum/error-message.enum';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  courses: CourseModel[];
  formCourse: FormGroup;
  rooms: SelectListModel[] = [];
  teachers: SelectListModel[] = [];
  util = new Util();
  errorMessage = ErrorMessageEnum;
  showModal = false;
  fieldsEmpties = false;

  constructor(
    public courseFacadeService: CourseFacadeService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.courseFacadeService.getAllCourses().subscribe((courses: CoursesModel) => {
      this.courses = courses.cursos;
    });
    this.buildResourceForm();
  }

  private buildResourceForm(): void {
    this.formCourse = this.fb.group({
      courseName: [ null, [ Validators.required ] ],
      teacher: [ null, [ Validators.required ] ],
      rooms: [ null, [ Validators.required ] ],
      start: [ null, [ Validators.required ] ],
      end: [ null, [ Validators.required ] ],
    });
  }

  openModal(): void {
    this.showModal = true;
    this.courseFacadeService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
    });
    this.courseFacadeService.getTeachers().subscribe(teachers => {
      this.teachers = teachers;
    });
  }

  closeModal(): void {
    this.showModal = false;
  }

  addCourse(): void {
    if (this.formCourse.valid) {
      this.fieldsEmpties = false;
      const dto = this.courseFacadeService.createDTO(this.formCourse.value);
      this.courseFacadeService.createCourse(dto).pipe(
        switchMap(createData => {
          return this.courseFacadeService.getAllCourses();
        })
      ).subscribe(allCourses => {
        this.formCourse.reset();
        this.closeModal();
        this.courses = allCourses.cursos;
      });
    } else {
      this.fieldsEmpties = true;
    }
  }

  deleteCourse(id: string): void {
    this.courseFacadeService.deleteCourse(id).pipe(
      switchMap(deleteData => {
        return this.courseFacadeService.getAllCourses();
      })
    ).subscribe(allCourses => {
      this.courses = allCourses.cursos;
    });
  }

  isInvalid(controlName): boolean {
    return this.util.controlPristineIsInvalid(controlName, this.formCourse);
  }

}
