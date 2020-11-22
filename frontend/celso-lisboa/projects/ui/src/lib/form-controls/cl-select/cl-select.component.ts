import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {FormFieldBaseDirective} from '../abstract-classes/form-field-base';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectListModel} from '../models/select-list.model';

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
  @Input() options: SelectListModel[];
  constructor() {
    super();
  }
  adjustmentValue(value): void {
    const option = this.options.filter(element => element.value == value);
    this.onChange(option[0]);
    // this.onChange(value);
  }
}
