import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CursosComponent } from './cursos/cursos.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './core/services/auth.service';
import { AppRoutingModule } from './app.routing';
import { ModalModule } from 'ngx-bootstrap';
import { ModalCursoComponent } from './shared/content/modal-curso/modal-curso.component';
import { CursoService } from './core/services/curso.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      CursosComponent,
      NavBarComponent,
      ModalCursoComponent
   ],
   imports: [
      BrowserModule,
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule,
      AppRoutingModule,
      ModalModule.forRoot(),
      NgMultiSelectDropDownModule,
      BrowserAnimationsModule, 
      ToastrModule.forRoot() 
   ],
   entryComponents:[ModalCursoComponent],
   providers: [ AuthService, CursoService ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
