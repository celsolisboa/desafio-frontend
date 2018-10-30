import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userName: string;
  public errorMessage: string;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  login(email: string, password: string): void {
    event.preventDefault();
    this.errorMessage = null;
    
    this.loginService.login(email, password).subscribe(
      (response) => {
        if (response) {
          this.router.navigate(['/cursos']);
        } else {
          this.errorMessage = 'Credenciais inválidas.\nFavor verificar seu email e senha.';
        }
      }
    );
  }

}
