import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.scss']
})
export class CloseButtonComponent implements OnInit {
  @Input() public color: string;

  constructor() { }

  ngOnInit() {
  }

}
