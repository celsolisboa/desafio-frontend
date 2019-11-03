import { DataService } from './../data.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginDTO } from '../model/login-model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //  email = 'bill@gmail.com';
  //  password = 'test123';

   loginDTO: LoginDTO
   loginForm;
    loading = false;
    submitted = false;
    returnUrl: string;

  constructor( private formBuilder: FormBuilder,
    private dataServise: DataService,
    private route: ActivatedRoute,
    private router: Router) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }



  ngOnInit() {
   console.log('LOGIN START !');
   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  login() {

    this.dataServise.sendPostLogin(this.f.email.value, this.f.password.value).

      subscribe(r => {
        if (r) {
          console.log("Login Sucesso !!" + r);

          return r;
        } else {
          console.log("Login Erro !");

          return 
        }
      },
        r => {
          alert(r.error.error);
        });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        
        this.loading = true;

        this.dataServise.sendPostLogin( this.f.email.value, this.f.password.value)
            .subscribe(
                data => {
                  console.log(data);
                   
                    this.router.navigate([this.returnUrl]);
                    
                },
                error => {
                    console.log(error);
                });
  }
}
