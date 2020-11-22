import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {fromEvent, Subscription} from 'rxjs';

@Directive()
export abstract class FormFieldBaseDirective implements OnInit, OnDestroy, ControlValueAccessor {
  class = '';
  subscription: Subscription;

  value: string;
  onChange: (value: any) => void;
  onTouched: () => void;
  disabled: boolean;

  @Input() label: string;
  @Input() type: string;

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