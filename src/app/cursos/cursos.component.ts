import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Curso } from './curso';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  curso: Curso = new Curso();

  cursos: any = [];
  professores: any = [];
  salas: any = [];
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    public apiService: ApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.listaCursos();
    this.listaProfessores();
    this.listaSalas();
  }

  listaCursos() {
    return this.apiService.getCursos()
      .subscribe((data: {}) => {
        this.cursos = data;
      });
  }

  adicionaCurso() {
    this.apiService.criarCurso(this.curso).subscribe(
      (data: {}) => {
        this.modalRef.hide();
        this.listaCursos();
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
      });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
