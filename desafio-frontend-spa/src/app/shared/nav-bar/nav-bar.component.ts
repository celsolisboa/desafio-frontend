import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModalCursoComponent } from '../content/modal-curso/modal-curso.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  bsModalRef: BsModalRef;

  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: true,
    class: "curso-modal modal-dialog-centered"
  };

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModal() {
    this.bsModalRef = this.modalService.show(ModalCursoComponent, this.config);
  }


}
