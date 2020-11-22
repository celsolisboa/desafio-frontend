import {Component, forwardRef, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormFieldBaseDirective} from '../abstract-classes/form-field-base';

@Component({
  selector: 'ui-cl-input',
  templateUrl: './cl-input.component.html',
  styleUrls: ['./cl-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClInputComponent),
      multi: true
    }
  ]
})
export class ClInputComponent extends FormFieldBaseDirective {
  @Input() type: string;
  constructor() {
    super();
  }
}
