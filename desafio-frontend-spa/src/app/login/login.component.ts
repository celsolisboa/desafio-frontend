import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Usuario } from '../core/models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin:FormGroup;
  public usuario: Usuario;
  public loading: boolean = false;
  public errors: string = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router
    ) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  login() {
    if(this.formLogin.dirty && this.formLogin.valid){
      this.errors = null;
      const u = Object.assign({}, this.usuario, this.formLogin.value);

      this.loading = true;

      this.authService.login(u)
            .subscribe(
              (response) => this.onSaveComplete(response),
              (error) => this.onError(error),
              () => ("Usuario logado.")
            );
    }
  }

  onSaveComplete(response: any): void {
    //console.log(response);
    this.formLogin.reset();
    this.errors = null;

    this.loading = false;

    sessionStorage.setItem('eio.usuario', response.firstName);
    this.router.navigate(['/cursos']);
  }

  onError(fail: any) {
    setTimeout(() => {
      this.loading = false;
    }, 200);

    if(fail.status == '401') {
      this.errors = fail.statusText;
      this.errors = "O endereço de email ou a senha que você inseriu não é válido."
      // console.log(this.errors);
    }
  }
  


}
