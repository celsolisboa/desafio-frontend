import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Curso } from './curso';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  select: string;
  curso: Curso = new Curso();

  cursos: any = [];
  professores: any = [];
  salas: any = [];
  modalRef: BsModalRef;

  cursoForm = this.fb.group({
    nome: [''],
    professores: this.fb.array([
        this.fb.group({
          id: [''],
          nome: ['']
        })
    ]),
    salas: this.fb.array([
      this.fb.group({
        id: [''],
        sala: ['']
      })
    ]),
    inicio: [''],
    fim: ['']
  });
  profs = this.cursoForm.get('professores') as FormArray;
  sal = this.cursoForm.get('salas') as FormArray;

  constructor(
    private modalService: BsModalService,
    public apiService: ApiService,
    public actRoute: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.listaCursos();
    this.listaProfessores();
    this.listaSalas();
  }

  event(event) {
    this.select = event.target.options[event.target.selectedIndex].text;
  }

  listaCursos() {
    return this.apiService.getCursos()
      .subscribe((data: {}) => {
        this.cursos = data;
      });
  }

  adicionaCurso() {
    this.apiService.criarCurso(this.cursoForm.value).subscribe(
      (data: {}) => {
        this.modalRef.hide();
        this.listaCursos();
        this.cursoForm.reset();
      });
  }

  deletaCurso(id) {
    if (window.confirm('Deseja excluir este curso?')) {
      this.apiService.deletaCurso(id).subscribe(data => {
        this.listaCursos();
      });
    }
  }

  listaProfessores() {
    return this.apiService.getProfessores()
      .subscribe((data: {}) => {
        this.professores = data;
      });
  }

  listaSalas() {
    return this.apiService.getSalas()
      .subscribe((data: {}) => {
        this.salas = data;
        console.log(this.salas);
      });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
