import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  private isAuthorized = false;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.isAuthorized = Boolean(sessionStorage.getItem('isAuthorized'));
    if (this.isAuthorized) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  saveAuth(isAuthorized): void {
    sessionStorage.setItem('isAuthorized', isAuthorized);
  }
}
