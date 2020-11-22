import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ui-cl-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output() closeModal = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
