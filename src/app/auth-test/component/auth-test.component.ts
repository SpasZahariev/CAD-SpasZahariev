import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/common/services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-test',
  templateUrl: './auth-test.component.html',
  styleUrls: ['./auth-test.component.css']
})
export class AuthTestComponent implements OnInit {
  signedIn: boolean;
  user: any;
  greeting: string;


  // constructor(private amplifyService: AmplifyService) {

  //   this.amplifyService.authStateChange$.subscribe(authState => {
  //     this.signedIn = authState.state === 'signedIn';
  //     if (!authState.user) {
  //       this.user = null;
  //     } else {
  //       this.user = authState.user;
  //       this.greeting = 'Hola amigo ' + this.user.username;
  //     }
  //   });

  // }

  public userGroup: FormGroup;
  public regGroup: FormGroup;
  public authCode: FormControl = new FormControl();

  // for displaying the code submit field
  public isCodeSent = false;
  public isRegistering = false;
  public showErrorMessage = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthorizationService, private router: Router) {
    this.userGroup = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });

    this.regGroup = this.formBuilder.group({
      regEmail: new FormControl(null, [Validators.required, Validators.email]),
      regPassword: new FormControl(null, [Validators.required]),
      regRepeatPassword: new FormControl(null, [Validators.required])
    });
   }

  ngOnInit() {}

  public login() {
    const email = this.userGroup.value.email;
    const password = this.userGroup.value.password;
    if (this.userGroup.invalid) {
      this.showErrorMessage = true;
      return;
    }
    this.auth.signIn(email, password).subscribe(
    (data) => {
      this.showErrorMessage = false;
      this.router.navigateByUrl('/user-page');
    },
    (err) => {
      this.showErrorMessage = true;
    });
  }

  // check if fields are alright and send to cognito
  public register() {
    const email = this.regGroup.value.regEmail;
    const password = this.regGroup.value.regPassword;
    const repeatPassword = this.regGroup.value.repeatPassword;
    if (password !== repeatPassword || this.regGroup.invalid) {
      this.showErrorMessage = true;
      return;
    }
    this.auth.register(email, password).subscribe((data) => {
      this.isCodeSent = true;
    });
  }

  public submitCode() {
    const code = this.authCode.value;
    console.log(code);
    this.auth.confirmAuthCode(code).subscribe(
    (data) => {
      this.showErrorMessage = false;
      this.router.navigateByUrl('/user-page');
    },
    (err) => {
      this.showErrorMessage = true;
    });
  }
}
