import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import {LoginComponent} from "./login/login.component";
import {CoursesComponent} from "./courses/courses.component";

const appRoutes: Routes = [
  // aqui vão as rotas (links de navegação)
  { path: '', directTo:'/login', component: LoginComponent },
  //{ path: '**', component: LoginComponent },
  { path: 'courses', component: CoursesComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
