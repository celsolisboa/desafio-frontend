import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private fb: FormBuilder) {  }

  ngOnInit(): void {
    this.buildResourceForm();
  }

  private buildResourceForm(): void {
    this.formLogin = this.fb.group({
      email: [ null, [ Validators.required, Validators.email] ],
      password: [ null, [ Validators.required ] ],
    });
  }

  clickTest(): void {
    console.log('test');
  }

  isInvalid(controlName): boolean {
    const control = this.formLogin.get(controlName);
    if (!control.pristine) {
      return this.formLogin.get(controlName).invalid;
    }
    return false;
  }
}
