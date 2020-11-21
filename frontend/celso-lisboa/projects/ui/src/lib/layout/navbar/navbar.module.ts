import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {ButtonRoundedModule} from '../button-rounded/button-rounded.module';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    ButtonRoundedModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
