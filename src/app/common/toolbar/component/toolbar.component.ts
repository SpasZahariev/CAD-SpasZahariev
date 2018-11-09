import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private auth: AuthorizationService, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
  }

  public wut() {
    console.log(this.cookieService.get('userCookie'));
  }

  public signOut() {
    this.router.navigateByUrl('/login-page');
    this.cookieService.deleteAll();
    this.auth.logOut();
  }

  public isSignedIn(): boolean {
    return this.cookieService.check('userCookie');
  }
}
