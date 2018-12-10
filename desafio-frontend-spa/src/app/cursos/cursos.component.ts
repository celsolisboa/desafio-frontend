import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CursoService } from '../core/services/curso.service';
import { Curso} from '../core/models/curso';
import { AtualizarListaService } from '../core/services/atualizarLista.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos: Array<Curso>;

  atualizarLista: boolean;

  constructor(
    private cursoService: CursoService,
    ) { }

  ngOnInit() {
    this.obterListaDeCursos();

    AtualizarListaService.alterouValor.subscribe(res => {
        this.atualizarLista = res;  
        if (this.atualizarLista) {
            this.obterListaDeCursos();
        }
      } )


  }
  
  obterListaDeCursos() {
    this.cursoService.obterListaDeCursos()
       .subscribe(
           (response) => {
             this.cursos = response;
             console.log(this.cursos);
           },
           (error) => console.log(error)
         );
  }

  excluirCurso(id: string) {
   this.cursoService.excluirCurso(id) 
      .subscribe(response => console.log(response));
  }

}
