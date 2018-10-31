import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-auth-test',
  templateUrl: './auth-test.component.html',
  styleUrls: ['./auth-test.component.css']
})
export class AuthTestComponent implements OnInit {
  signedIn: boolean;
  user: any;
  greeting: string;


  constructor(public amplifyService: AmplifyService) {
    this.amplifyService = amplifyService;

    this.amplifyService.authStateChange$.subscribe(authState => {
      this.signedIn = authState.state === 'signedIn';
      if (!authState.user) {
        this.user = null;
      } else {
        this.user = authState.user;
        this.greeting = 'Hola amigo ' + this.user.username;
      }
    });
  }

  ngOnInit() {}
}
