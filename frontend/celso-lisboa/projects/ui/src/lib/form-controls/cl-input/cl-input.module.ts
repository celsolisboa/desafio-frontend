import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClInputComponent } from './cl-input.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [ClInputComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ClInputComponent]
})
export class ClInputModule { }
