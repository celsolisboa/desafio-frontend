import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-cursos-listagem',
  templateUrl: './cursos-listagem.component.html',
  styleUrls: ['./cursos-listagem.component.css']
})
export class CursosListagemComponent implements OnInit {

  cursos: Array<any>;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.listar();
  }

  listar(){
    this.courseService.listar().subscribe(dados => this.cursos = dados);    
  }

}
