import { Component, OnInit } from '@angular/core';
import { CoursesService } from './courses.service';
import { Curso } from './courses';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html'
})


export class CoursesComponent implements OnInit {

  //recebe os dados de curso
  cursos: Curso[];

  constructor(private service: CoursesService) {}

    ngOnInit() {

      this.service.getCursos()
      .subscribe(
        dados => this.cursos = dados
        )

    }
}
