import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/common/services/authorization.service';
import { CookieService } from 'ngx-cookie-service';
import { UserFormService } from 'src/app/user-page/user-form/service/user-form.service';
import { IUserData } from 'src/app/common/interfaces/interfaces';

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
  private userEmail: string = null;

  // for displaying the code submit field
  public isCodeSent = false;
  public isRegistering = false;
  public showErrorMessage = false;

  constructor(private formBuilder: FormBuilder,
    private auth: AuthorizationService,
    private router: Router,
    private cookieService: CookieService,
    private userFormService: UserFormService) {
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
      // set the cookies
      const token = data.getAccessToken().getJwtToken();
      this.userFormService.queryUsersByEmail(email);
      this.cookieService.set('userCookie', token);

      this.showErrorMessage = false;
      this.router.navigateByUrl('/user-page');
    },
    (err) => {
      this.showErrorMessage = true;
    });
  }

  // user decided to register instead of logging in
  public registerForm() {
    this.isRegistering = true;
    this.showErrorMessage = false;
  }

  // check if fields are alright and send to cognito
  public register() {
    const email: string = this.regGroup.value.regEmail;
    this.userEmail = email;
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
    this.auth.confirmAuthCode(code).subscribe(
    (data) => {
      // now to login normally
      this.showErrorMessage = false;
      this.isCodeSent = false;
      this.isRegistering = false;
      // create new user entry in DynamoDB
      const tempName = this.userEmail.substring(0, this.userEmail.indexOf('@'));
      const user: IUserData = {
        id: null,
        name: tempName,
        position: 'Developer',
        email: this.userEmail,
        assignment: 'Unassigned'
      };
      this.userFormService.postUser(user);
    },
    (err) => {
      this.showErrorMessage = true;
    });
  }
}
