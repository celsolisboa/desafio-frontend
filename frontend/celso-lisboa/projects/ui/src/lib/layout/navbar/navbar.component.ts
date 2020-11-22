import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ui-cl-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() title: string;
  @Input() labelButton: string;
  @Output() buttonEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
