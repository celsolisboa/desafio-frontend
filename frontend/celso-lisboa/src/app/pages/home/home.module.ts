import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home.component';
import { HomeRoutingModule } from './home.routing.module';
import {NavbarModule} from '../../../../projects/ui/src/lib/layout/navbar/navbar.module';
import {BackgroundModule} from '../../../../projects/ui/src/lib/layout/background/background.module';
import {CardCourseModule} from '../../../../projects/ui/src/lib/layout/card-course/card-course.module';
import {ModalModule} from '../../../../projects/ui/src/lib/layout/modal/modal.module';
import {ClInputModule} from '../../../../projects/ui/src/lib/form-controls/cl-input/cl-input.module';
import {ClButtonModule} from '../../../../projects/ui/src/lib/layout/button/cl-button.module';
import {ClSelectModule} from '../../../../projects/ui/src/lib/form-controls/cl-select/cl-select.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    NavbarModule,
    CardCourseModule,
    ModalModule,
    ClSelectModule,
    ClInputModule,
    ClButtonModule,
    BackgroundModule
  ]
})
export class HomeModule { }
