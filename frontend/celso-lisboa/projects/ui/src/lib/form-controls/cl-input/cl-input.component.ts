import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';

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
export class ClInputComponent implements OnInit, OnDestroy, ControlValueAccessor {

  class = '';
  subscription: Subscription;

  value: string;
  onChange: (value: any) => void;
  onTouched: () => void;
  disabled: boolean;

  @Input() label: string;

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

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
