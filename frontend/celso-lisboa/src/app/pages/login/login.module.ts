import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login.component';
import {LoginRoutingModule} from './login.routing.module';
import {ClInputModule} from '../../../../projects/ui/src/lib/form-controls/cl-input/cl-input.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ClButtonModule} from '../../../../projects/ui/src/lib/layout/button/cl-button.module';
import {HttpClientModule} from '@angular/common/http';
import {BackgroundModule} from '../../../../projects/ui/src/lib/layout/background/background.module';
import {ModalModule} from '../../../../projects/ui/src/lib/layout/modal/modal.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ClInputModule,
    ClButtonModule,
    BackgroundModule,
    ModalModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class LoginModule { }
