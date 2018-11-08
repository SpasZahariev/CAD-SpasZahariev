import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private auth: AuthorizationService) { }

  ngOnInit() {
  }

  public wut() {
    console.log(this.auth.getAuthenticatedUser());
  }
}
