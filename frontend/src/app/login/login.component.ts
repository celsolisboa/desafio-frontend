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
   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    this.dataServise.sendPostLogin(this.f.email.value, this.f.password.value)
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
