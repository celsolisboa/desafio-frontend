import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClSelectComponent } from './cl-select.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [ClSelectComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ClSelectComponent]
})
export class ClSelectModule { }
