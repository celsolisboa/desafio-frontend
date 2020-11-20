import {Component, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';

@Component({
  selector: 'ui-cl-input',
  templateUrl: './cl-input.component.html',
  styleUrls: ['./cl-input.component.css']
})
export class ClInputComponent implements OnInit, OnDestroy {

  value: string;
  class = '';
  subscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.subscription = fromEvent(document, 'focusout').subscribe( data => {
      if (this.value) {
        this.class = 'has-value';
      } else {
        this.class = '';
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
