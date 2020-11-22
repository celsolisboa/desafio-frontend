import {Component, forwardRef, OnInit} from '@angular/core';
import {FormFieldBaseDirective} from '../abstract-classes/form-field-base';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'ui-cl-select',
  templateUrl: './cl-select.component.html',
  styleUrls: ['./cl-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClSelectComponent),
      multi: true
    }
  ]
})
export class ClSelectComponent extends FormFieldBaseDirective {
  constructor() {
    super();
  }
}
