import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CourseModel} from '../../../../../../src/app/shared/models/courses.model';
import {Util} from '../../../../../../src/app/shared/util/util';
import {CourseResourceService} from '../../../../../../src/app/shared/services/course.resource.service';

@Component({
  selector: 'ui-cl-card-course',
  templateUrl: './card-course.component.html',
  styleUrls: ['./card-course.component.css']
})
export class CardCourseComponent implements OnInit {

  @Input() course: CourseModel;
  @Output() closeEvent = new EventEmitter<string>();
  rooms: string;
  teachers: string;
  util = new Util();

  constructor(private courseService: CourseResourceService) {  }

  ngOnInit(): void {
    this.rooms = this.util.transformListToString(this.course.salas, 'sala');
    this.teachers = this.util.transformListToString(this.course.professores, 'nome');
  }

  close(): void {
    const id = this.course.id;
    this.closeEvent.emit(id);
  }
}
