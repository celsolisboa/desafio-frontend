import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import toastr from "toastr";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router) { 
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha : ['', [Validators.required]]
    });  
  }

  ngOnInit() {
  }

  login(){
    if(this.formGroup.valid){
      this.loginService.login(this.formGroup.value)
      .subscribe( 
      resp => {
        //console.log(resp)
      }, 
      error => {
        //console.log(error)
      });
      this.router.navigate(['/cursos']);
    } else {
      toastr.error("Infome um email e senha válidos")
    }
    
  }

}
