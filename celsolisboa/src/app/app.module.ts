import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './authguard.guard';
import { UserService } from './user.service';
import { FormsModule } from '@angular/forms';
import { CursosListagemComponent } from './cursos-listagem/cursos-listagem.component';
import { CourseService } from './course.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './app.service';
import { DelCourseService } from './del-course.service';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './modal.service';


const appRoutes:Routes = [
  {
    path: '',
    component: LoginFormComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthguardGuard]    
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,    
    LoginFormComponent,
    FooterComponent,
    DashboardComponent,
    CursosListagemComponent,
    ModalComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [UserService, AuthguardGuard, CourseService, AuthenticationService, DelCourseService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
