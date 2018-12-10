import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso, Sala, Professor } from 'src/app/core/models/curso';
import { CursoService } from 'src/app/core/services/curso.service';
import { ToastrService } from 'ngx-toastr';
import { CursosComponent } from 'src/app/cursos/cursos.component';
import { AtualizarListaService } from 'src/app/core/services/atualizarLista.service';

@Component({
  selector: 'app-modal-curso',
  templateUrl: './modal-curso.component.html',
  styleUrls: ['./modal-curso.component.css']
})
export class ModalCursoComponent implements OnInit {

  public cursoForm: FormGroup;
  public curso: Curso;
  public error: string;
  public loading: boolean;
  public listaDeSalas: Array<Sala>;
  public listaDeProfessor: Array<Professor>;
  public totalDeCurso: number;

  @Output() atualizarLista = new EventEmitter();

  selectedItemProfessores = [];
  dropdownSettingsProfessores = {};

  selectedItemSalas = [];
  dropdownSettingsSalas = {};

  constructor(
    public bsModalRef: BsModalRef,
    private fb:FormBuilder,
    private cursoService: CursoService,
    private atualizaListaService: AtualizarListaService,
    private toastr: ToastrService
    ) {}
  
  ngOnInit() {

    this.cursoForm = this.fb.group({
      nome: ['',Validators.required],
      professores: ['', Validators.required],
      salas: ['', Validators.required],
      inicio: ['',Validators.required],
      fim: ['', Validators.required]
    });

    this.dropdownSettingsProfessores = {
      singleSelection: false,
      idField: 'id',
      textField: 'nome',
      selectAllText: 'Marcar todos',
      unSelectAllText: 'Desmarcar todos',
      searchPlaceholderText: "Buscar",
      itemsShowLimit: 3,
      allowSearchFilter: false,
      closeDropDownOnSelection: true
    };

    this.dropdownSettingsSalas = {
      singleSelection: false,
      idField: 'id',
      textField: 'sala',
      selectAllText: 'Marcar todos',
      unSelectAllText: 'Desmarcar todos',
      searchPlaceholderText: "Buscar",
      itemsShowLimit: 3,
      allowSearchFilter: false,
      closeDropDownOnSelection: true
    };

    this.obterListaDeProfessores();
    this.obterListaDeSalas();
    this.cursoService.obterTotalCurso().subscribe(data => {
        this.totalDeCurso = data;
        console.log(this.totalDeCurso);
        
    });


  } 

  onItemSelect(item: any) {
    console.log(item);
  }


  obterListaDeProfessores() {
    this.cursoService.obterListaDeProfessores()
                    .subscribe(
                      (response) => {
                        this.listaDeProfessor = response;
                        console.log(this.listaDeProfessor);
                      },
                      (error) => console.log(error)
                    );
  }

  obterListaDeSalas() {
    this.cursoService.obterListaDeSalas()
                    .subscribe(
                      (response) => {
                        this.listaDeSalas = response;
                        console.log(this.listaDeSalas);
                      },
                      (error) => console.log(error)
                    );
  }

  cadastrarCurso(){
    if (this.cursoForm.dirty && this.cursoForm.valid) {
      const c = Object.assign({}, this.curso, this.cursoForm.value);
      this.loading = false;
      c.id = this.totalDeCurso + 1;

      console.log(c);
      
      this.cursoService.cadastrarCurso(c)
                       .subscribe(
                         (response) =>  this.onSaveComplete(response),
                         (error) => this.onError(error)
                       );
    }
  }

  onSaveComplete(response: any): void {
    this.cursoForm.reset();
    this.bsModalRef.hide();
    this.toastr.success("Curso adicionado com sucesso.");
    this.atualizaLista();
  }

  testeMethod() {
    this.atualizarLista.emit()
  }

  onError(fail: any) {
    // this.error = fail.error;
    console.log(fail);
    this.toastr.error("Erro ao adicionar curso.", "Ops!!")
  }

  atualizaLista() {
    this.atualizaListaService.atualizaLista();
  }

}
