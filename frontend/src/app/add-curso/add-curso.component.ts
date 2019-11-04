import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.component.html',
  styleUrls: ['./add-curso.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class AddCursoComponent implements OnInit {

  formCadastro;
  // professores :{
  //   id: String;
  //   nome: String;
  // }[];
  // salas:{
  //   id: String;
  //   sala: String;
  // }[];

  professores:any[];
  salas:any[];
  constructor(config: NgbModalConfig, private modalService: NgbModal,private formBuilder: FormBuilder,
    private dataServise: DataService) { 
    //config.backdrop = 'static';
    config.keyboard = false;

    this.formCadastro = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.email]],
      professores: ['', [Validators.required]],
      salas: ['', [Validators.required]],
      inicio:['',[Validators.required]],
      fim:['',[Validators.required]]
    });
  }

  ngOnInit() {

    this.professores = [];
    this.salas = [];

    this.dataServise.sendGetListaProfessores().subscribe((data:any[])=>{
      this.professores = data;
    });

    this.dataServise.sendGetSala().subscribe((data:any)=>{
      this.salas = data;
    })
  }

  get f() { return this.formCadastro.value; }

  open(content) {
    this.modalService.open(content);
  }

  onSubmit() {
    // if (this.formCadastro.invalid) {
    //   return;
    // }

    console.log(this.formCadastro.value)
    this.dataServise.sendPostCurso(this.f)
    .subscribe(
      data => {
        console.log(this.f);

      

      },
      error => {
        console.log(error);
      });
  }
}
