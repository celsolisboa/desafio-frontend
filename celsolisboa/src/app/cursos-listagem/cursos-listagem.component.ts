import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { DelCourseService } from '../del-course.service';

@Component({
  selector: 'app-cursos-listagem',
  templateUrl: './cursos-listagem.component.html',
  styleUrls: ['./cursos-listagem.component.css']
})
export class CursosListagemComponent implements OnInit {

  cursos: Array<any>;

  constructor(private courseService: CourseService, private DelCourseService: DelCourseService) { }

  ngOnInit() {
    this.listar();
  }

  listar(){
    this.courseService.listar().subscribe(dados => this.cursos = dados);    
  }
  del(id){
    this.DelCourseService.deleteUser(id).subscribe(() => console.log("user deleted"));
    this.listar();
  }

}
