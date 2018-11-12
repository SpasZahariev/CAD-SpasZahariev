import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  IProjectData,
  IUserData,
  IAccessCookie
} from 'src/app/common/interfaces/interfaces';
import { UserFormService } from '../service/user-form.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  public userData: IUserData = null;
  public associatedProjects: IProjectData[] = null;

  public userGroup: FormGroup;
  public cookie: IAccessCookie = null;
  public isAdmin = false;
  public usedCookie = false;

  constructor(
    private formBuilder: FormBuilder,
    private userFormService: UserFormService,
    private cookieService: CookieService
  ) {
    this.userGroup = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      position: new FormControl(null, [Validators.required]),
      assignment: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    // when the survice calls a GET request to DynamoDB, this displays the data
    this.userFormService.userReceived.subscribe(user => {
      this.userData = user;
      this.userGroup.patchValue({
        name: this.userData.name,
        email: this.userData.email,
        position: this.userData.position,
        assignment: this.userData.assignment
      });
      // check if the cookie has been assigned
      if (!this.usedCookie) {
        this.getCookie();
        this.usedCookie = true;
      }
      this.adjustPermissions();
    });

    // listen if the Database has projects this user is working on
    this.userFormService.projectsReceived.subscribe(projects => {
      this.associatedProjects = projects;
    });
  }

  private getCookie() {
    this.cookie = JSON.parse(this.cookieService.get('accessCookie'));
    if (this.cookie.position === 'Admin') {
      this.isAdmin = true;
    }
  }

  // sets form inputs to enabled/disabled
  private adjustPermissions() {
    this.userGroup.controls.name.disable();
    this.userGroup.controls.email.disable();
    this.userGroup.controls.position.disable();
    this.userGroup.controls.assignment.disable();

    if (this.isUser()) {
      this.userGroup.controls.name.enable();
      this.userGroup.controls.email.enable();
      this.userGroup.controls.assignment.enable();
    }
    if (this.isManager()) {
      this.userGroup.controls.assignment.enable();
    }
    if (this.isAdmin) {
      this.userGroup.controls.position.enable();
    }
  }



  // used to push form values to dynamo and check if they are valid
  private syncWithForm() {
    if (this.userGroup.value.name) {
      this.userData.name = this.userGroup.value.name;
    }
    if (this.userGroup.value.email) {
      this.userData.email = this.userGroup.value.email;
    }
    if (this.userGroup.value.position) {
      this.userData.position = this.userGroup.value.position;
    }
    if (this.userGroup.value.assignment) {
      this.userData.assignment = this.userGroup.value.assignment;
    }
  }

  // check if selected user is the one that is logged in
  private isUser(): boolean {
    return (this.cookie.email === this.userData.email) || this.isAdmin;
  }
  // checks if logged in user is a project manager
  public isManager(): boolean {
    // we find out if our user is the manager when we use the cookie
    if (this.usedCookie) {
      return (this.cookie.position === 'Project Manager') || this.isAdmin;
    }
    return false;
  }

  public updateUser() {
    this.syncWithForm();
    this.userFormService.updateUser(this.userData);
  }

  public newUser() {
    let name = this.userGroup.value.name;
    let email = this.userGroup.value.email;
    let position = this.userGroup.value.position;
    let assignment = this.userGroup.value.assignment;
    if (this.isManager()) {
    name = 'newUser';
    email = 'newUser@gmail.com';
    position = 'Developer';
    assignment = 'Unassigned';
    }
    const user: IUserData = {
      id: null,
      name: name,
      email: email,
      position: position,
      assignment: assignment
    };
    this.userFormService.postUser(user);
  }

  public deleteUser() {
    this.userFormService.deleteUser(this.userData.id);
  }

  public isFormValid(): boolean {
    return this.userGroup.valid;
  }
}
