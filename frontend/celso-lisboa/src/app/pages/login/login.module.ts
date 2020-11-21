import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login.component';
import {LoginRoutingModule} from './login.routing.module';
import {ClInputModule} from '../../../../projects/ui/src/lib/form-controls/cl-input/cl-input.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ClButtonModule} from '../../../../projects/ui/src/lib/layout/cl-button/cl-button.module';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ClInputModule,
    ClButtonModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class LoginModule { }
