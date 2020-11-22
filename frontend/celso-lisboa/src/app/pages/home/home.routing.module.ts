import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './component/home.component';


export const authRoutes: Routes = [
  {path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
