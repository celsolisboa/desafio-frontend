import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import {LoginComponent} from "./login/login.component";
import {CoursesComponent} from "./courses/courses.component";
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  // aqui vão as rotas (links de navegação)
  {
     path: '',
     component: LoginComponent
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate:[AuthGuard]
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
