import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  public email;

  constructor() { 
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn(){
    this.isUserLoggedIn = true;
    this.email = 'admin@gmail.com';
  }

  getUserLoggedIn(){
    return this.isUserLoggedIn;
  }
}
