import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthenticationService } from '../app.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  notificationForm = "";

  constructor(private router:Router, private user:UserService, private access: AuthenticationService) { }

  ngOnInit() {
  }

  loginUser(e){
    e.preventDefault();
    //console.log(e);
    var email = e.target.elements[0].value;
    var password = e.target.elements[1].value;

    this.access.login(email,password); 

    if(email == 'admin@gmail.com' && password == 'admin'){    
      this.user.setUserLoggedIn();
      this.router.navigate(['dashboard']);
    }
    else{
      /* alert("Usuário e/ou senha incorreto!");*/
      this.notificationForm = "Usuário e/ou senha incorreto!";
      //location.reload();
      e.target.elements[0].value="";
      e.target.elements[1].value="";
    }

  }

  
}
