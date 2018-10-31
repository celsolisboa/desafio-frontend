import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() public label: string;
  @Input() public id: string;
  @Output() closeTag: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
