import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/common/services/authorization.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  signedIn: boolean;
  user: any;
  greeting: string;


  public userGroup: FormGroup;
  public regGroup: FormGroup;
  public authCode: FormControl = new FormControl();

  // for displaying the code submit field
  public isCodeSent = false;
  public isRegistering = false;
  public showErrorMessage = false;

  constructor(private formBuilder: FormBuilder,
    private auth: AuthorizationService,
    private router: Router,
    private cookieService: CookieService) {
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
      const token = data.getAccessToken().getJwtToken();
      // const expiration = Date.now();
      // const expiration = someDate.setHours(someDate.getHours()+1);
      this.cookieService.set('userCookie', token);

      this.showErrorMessage = false;
      this.router.navigateByUrl('/user-page');
    },
    (err) => {
      this.showErrorMessage = true;
    });
  }

  public registerForm() {
    this.isRegistering = true;
    this.showErrorMessage = false;
  }

  // check if fields are alright and send to cognito
  public register() {
    const email = this.regGroup.value.regEmail;
    const password = this.regGroup.value.regPassword;
    const repeatPassword = this.regGroup.value.regRepeatPassword;
    if (password !== repeatPassword || this.regGroup.invalid) {
      this.showErrorMessage = true;
      return;
    }
    this.auth.register(email, password).subscribe((data) => {
      this.isCodeSent = true;
    });
  }

  // sending verification code to cognito
  public submitCode() {
    const code = this.authCode.value;
    console.log(code);
    this.auth.confirmAuthCode(code).subscribe(
    (data) => {
      // now to login normally
      this.showErrorMessage = false;
      this.isCodeSent = false;
      this.isRegistering = false;
    },
    (err) => {
      this.showErrorMessage = true;
    });
  }
}
