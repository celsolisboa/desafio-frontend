import { Component, OnInit } from '@angular/core';
import { CursoService } from './curso.service';

import {Curso} from './curso';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html'
})


export class CoursesComponent implements OnInit {

  cursos:object;

  constructor(private service: CursoService) {}

    ngOnInit() {
      this.service.getCursos().subscribe(
        dados => this.service = dados
      );
  }
}
