import { Component, OnInit } from '@angular/core';
import {HomeResourceService} from '../services/home.resource.service';
import {CoursesModel} from '../../../shared/models/courses.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeResourceService: HomeResourceService) { }

  ngOnInit(): void {
    this.homeResourceService.getAllCourses().subscribe((courses: CoursesModel) => {
      console.log(courses);
    });
  }

}
