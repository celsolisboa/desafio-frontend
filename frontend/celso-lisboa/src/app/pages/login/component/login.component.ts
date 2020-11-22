import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorMessageEnum} from '../../../shared/enum/error-message.enum';
import {LoginResourceService} from '../services/login.resource.service';
import {Util} from '../../../shared/util/util';
import {Router} from '@angular/router';
import {AuthGuardService} from '../../../core/auth/auth.guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  errorMessage = ErrorMessageEnum;
  userInvalid = false;
  fieldsEmpties = false;
  util = new Util();

  constructor(
    private fb: FormBuilder,
    private loginService: LoginResourceService,
    private router: Router,
    private authGuardService: AuthGuardService
  ) {  }

  ngOnInit(): void {
    this.buildResourceForm();
  }

  private buildResourceForm(): void {
    this.formLogin = this.fb.group({
      email: [ null, [ Validators.required, Validators.email] ],
      password: [ null, [ Validators.required ] ],
    });
  }

  submitForm(): void {
    if (this.formLogin.valid) {
      this.fieldsEmpties = false;
      this.loginService.login(this.formLogin.value).subscribe(
        (response => {
          this.userInvalid = false;
          this.authGuardService.saveAuth(true);
          this.router.navigate(['/home']);
        }),
        (error => {
          this.authGuardService.saveAuth(false);
          this.userInvalid = true;
        })
      );
    } else {
      this.fieldsEmpties = true;
    }
  }

  isInvalid(controlName): boolean {
    return this.util.controlPristineIsInvalid(controlName, this.formLogin);
  }
}
