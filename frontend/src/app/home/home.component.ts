import { Salas } from './../model/salas.model';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { Cursos } from '../model/cursos-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
teste: any = {};
 keys: any;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.sendGetListaCurso().subscribe((data:Cursos[])=>{
      console.log(data);
      this.teste = data;
    })
  }


  excluir(item:any){
    console.log(item.id);
  }
}
