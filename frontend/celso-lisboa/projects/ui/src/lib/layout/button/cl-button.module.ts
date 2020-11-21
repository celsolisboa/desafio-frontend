import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClButtonComponent } from './cl-button.component';

@NgModule({
  declarations: [ClButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [ClButtonComponent]
})
export class ClButtonModule { }
