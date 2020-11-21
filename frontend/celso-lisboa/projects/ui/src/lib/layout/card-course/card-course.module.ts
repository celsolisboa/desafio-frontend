import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCourseComponent } from './card-course.component';



@NgModule({
  declarations: [CardCourseComponent],
  imports: [
    CommonModule
  ],
  exports: [CardCourseComponent]
})
export class CardCourseModule { }
