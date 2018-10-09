import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html'
})


export class CoursesComponent implements OnInit {

  //url do curso
  private cursoURL = 'http://localhost:3000/api/curso';

  constructor( private _http: Http ) {}

    ngOnInit() {

    }

}
