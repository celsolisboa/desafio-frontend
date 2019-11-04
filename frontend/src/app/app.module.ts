import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes }  from './app-routing.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AlertModule } from 'ngx-bootstrap';
import { NavComponent } from './nav/nav.component';
import { CursosComponent } from './cursos/cursos.component';
import { AddCursoComponent } from './add-curso/add-curso.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavComponent,
    CursosComponent,
    AddCursoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [HttpClient,
  FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
