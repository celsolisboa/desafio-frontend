import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CursosComponent } from './cursos/cursos.component';
import { AuthGuard } from './guards/auth-guard';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'cursos', component: CursosComponent, canActivate: [AuthGuard] },
    { path: '', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }