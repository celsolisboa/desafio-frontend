import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ui-cl-button',
  templateUrl: './cl-button.component.html',
  styleUrls: ['./cl-button.component.css']
})
export class ClButtonComponent implements OnInit {

  @Input() label: string;
  @Output() buttonEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
