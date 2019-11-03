import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
teste: any[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.sendGetListaProfessores().subscribe((data:any[])=>{
      console.log(data);
      this.teste = data;
    })
  }

}
