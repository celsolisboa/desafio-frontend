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
  atualiza = false;
  constructor(
    private http: HttpClient
  ) { }

  getCursos(){
    return this.http.get<any>("http://localhost:3000/api/curso")
  }

  postCurso(curso){
    return this.http.post<any>("http://localhost:3000/api/curso", curso)
  }

  putCurso(curso){
    return this.http.patch<any>(`http://localhost:3000/api/curso/${curso.id}`, curso)
  }

  getProfs(){
    return this.http.get<any>("http://localhost:3000/api/professor")
  }

  getSalas(){
    return this.http.get<any>("http://localhost:3000/api/sala")
  }

  delCursos(id){
    return this.http.delete(`http://localhost:3000/api/curso/${id}`)
  }

  ngOnInit() {
    this.getCursos().subscribe(data =>{
      this.cursos = data.cursos
      console.log(this.cursos)
    })
    this.getProfs().subscribe( data => {
      this.professores = data
    })
    this.getSalas().subscribe( data => {
      this.salas = data
    })
  }

  cadastraCurso(){
    if (!this.atualiza){
      this.postCurso(this.novoCurso).subscribe( data => {
        alert('Cadastrado com sucesso!')
      }, error => {
        alert('Algo deu errado!')
      })
    }else{
      this.putCurso(this.novoCurso).subscribe( data => {
        alert('Atualizado com sucesso!')
      }, error => {
        alert('Algo deu errado!')
      })
    }
  }

  atualizaCurso(id){
    this.novoCurso = Object.assign({}, this.cursos.filter(x => x.id == id)[0])
    this.atualiza = true
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

  limpaCampos(){
    for(let key in this.novoCurso){
      if(this.novoCurso.hasOwnProperty(key)){
        if(typeof this.novoCurso[key] === 'string'){
          this.novoCurso[key] = ''
        }else if(this.novoCurso[key] instanceof Array){
          this.novoCurso[key] = []
        }
      }
    }
    this.atualiza = false;
  }

  cadastraSalas(options){
    this.novoCurso.salas = Object.assign(Array.apply(null, options)
      .filter(options => options.selected)
      .map(options => options.value))

    console.log(this.novoCurso.salas)
  }

  cadastraProfs(options){
    this.novoCurso.professores = Object.assign(Array.apply(null, options)
      .filter(options => options.selected)
      .map(options => options.value))

    console.log(this.novoCurso.professores)
  }


}
