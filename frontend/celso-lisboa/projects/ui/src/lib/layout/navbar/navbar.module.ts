import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {ClButtonModule} from '../cl-button/cl-button.module';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    ClButtonModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
