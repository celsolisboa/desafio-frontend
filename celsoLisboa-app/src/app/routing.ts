import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import {LoginComponent} from "./login/login.component";

const appRoutes: Routes = [
  // aqui vão as rotas (links de navegação)
  { path: '', component: LoginComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
