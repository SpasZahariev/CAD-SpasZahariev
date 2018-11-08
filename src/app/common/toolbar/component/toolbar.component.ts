import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private auth: AuthorizationService, private cookieService: CookieService) { }

  ngOnInit() {
  }

  public wut() {
    // console.log(this.auth.getAuthenticatedUser());
    console.log(this.cookieService.get('userCookie'));
  }
}
