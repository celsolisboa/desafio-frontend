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


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavbarModule,
    CardCourseModule,
    ModalModule,
    ClInputModule,
    ClButtonModule,
    BackgroundModule
  ]
})
export class HomeModule { }
