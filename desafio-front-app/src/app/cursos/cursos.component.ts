import { CursoService } from './../services/cursos.service';
import { Component, OnInit } from '@angular/core';
import toastr from "toastr";

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  items

  constructor(private cursoService: CursoService) { }

  ngOnInit() {
    this.cursoService.findAll().subscribe(
      resp => {
        this.items = resp;
      },
      error => {
        toastr.error("Falha ao buscas cursos: "+ error);
      }
    )
  }

  sizeProfessores(itens, index){
    if(itens.length > 1 && index != 0){
      return 'e';
    }
  }

  sizeSalas(itens, index){
    if(itens.length > 1 && index != 0){
      return 'e';
    }
  }

}
