import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() public text: string;
  @Input() public buttonStyle: string = 'rounded';
  @Input() public type: string = 'submit';

  constructor() { }

  ngOnInit() {
  }

}
