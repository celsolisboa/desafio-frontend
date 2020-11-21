import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home.component';
import { HomeRoutingModule } from './home.routing.module';
import {NavbarModule} from '../../../../projects/ui/src/lib/layout/navbar/navbar.module';
import {BackgroundModule} from '../../../../projects/ui/src/lib/layout/background/background.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavbarModule,
    BackgroundModule
  ]
})
export class HomeModule { }
