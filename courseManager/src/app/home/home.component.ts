import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {NgForm, NgModel} from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cursos: any;
  novoCurso = {
    nome:'',
    professores: [],
    salas: [],
    inicio: '',
    fim:''
  };
  nome = '';
  professores: [];
  salas: [];
  inicio: '';
  fim:'';
  constructor(
    private http: HttpClient
  ) { }

  getCursos():Observable<any>{
    return this.http.get<any>("http://localhost:3000/api/curso")
  }

  delCursos(id){
    return this.http.delete(`http://localhost:3000/api/curso/${id}`)
  }

  ngOnInit() {
    this.getCursos().subscribe(data =>{
      this.cursos = data.cursos
      console.log(this.cursos)
    })
  }

  cadastraCurso(){
    console.log(this.novoCurso)
  }

  deletaCurso(id){
    let curso = this.cursos.filter(x => x.id == id)
    console.log(curso)
    confirm(`Tem certeza que deseja deletar o curso ${curso[0].nome} ?`) ?
    this.delCursos(id).subscribe( data => {
      console.log(data)
    }) : false
  }

}
