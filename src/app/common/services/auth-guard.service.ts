// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public jwtHelper: JwtHelperService, private router: Router, private cookieService: CookieService) {}

  public isAuthenticated(): boolean {
    const jwtToken = this.cookieService.get('userCookie');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(jwtToken);
  }

  // for router checking
  public canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['login-page']);
      return false;
    }
    return true;
  }
}
