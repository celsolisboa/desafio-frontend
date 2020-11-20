import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {ClInputModule} from '../../../../projects/ui/src/lib/form-controls/cl-input/cl-input.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ClButtonModule} from '../../../../projects/ui/src/lib/layout/cl-button/cl-button.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ClInputModule,
    ClButtonModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
