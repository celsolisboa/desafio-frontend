import {Component, Input, OnInit} from '@angular/core';
import {CourseModel} from '../../../../../../src/app/shared/models/courses.model';
import {Util} from '../../../../../../src/app/shared/util/util';
import {Observable} from 'rxjs';
import {CourseResourceService} from '../../../../../../src/app/shared/services/course.resource.service';

@Component({
  selector: 'ui-cl-card-course',
  templateUrl: './card-course.component.html',
  styleUrls: ['./card-course.component.css']
})
export class CardCourseComponent implements OnInit {

  @Input() course: CourseModel;
  rooms: string;
  teachers: string;
  util = new Util();

  constructor(private courseService: CourseResourceService) {  }

  ngOnInit(): void {
    this.rooms = this.util.transformListToString(this.course.salas, 'sala');
    this.teachers = this.util.transformListToString(this.course.professores, 'nome');
  }

  deleteCourse(): void {
    const id = this.course.id;
    this.courseService.deleteCourse(id).subscribe(data => {
      console.log(data);
    });
  }
}
