import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   email = 'bill@gmail.com';
   password = 'test123';

   loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

  constructor(private api: ApiService, private formBuilder: FormBuilder ) { }



  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
  });
  }

  login() {
    this.api.login(
      this.email,
      this.password
    ).subscribe(r => {
      if (r.firstName) {
        console.log("Login Sucesso !!" + r.firstName);
      } else {
        console.log("Login Erro !");
      }
    },
      r => {
        alert(r.error.error);
      });
  }
}
