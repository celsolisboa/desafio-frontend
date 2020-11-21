import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ui-cl-button-rounded',
  templateUrl: './button-rounded.component.html',
  styleUrls: ['./button-rounded.component.css']
})
export class ButtonRoundedComponent implements OnInit {

  @Input() label: string;
  @Output() buttonEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
