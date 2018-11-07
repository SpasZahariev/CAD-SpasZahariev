import { Component, OnInit } from '@angular/core';
import { IUserData } from 'src/app/profile-page/user-table/component/user-table.component';
import { FormGroup, FormBuilder, FormControl, Validators, EmailValidator } from '@angular/forms';
import { UserFormService } from '../service/user-form.service';
import { IProjectData } from 'src/app/profile-page/project-table/component/project-table.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  public userData: IUserData = null;
  public associatedProjects: IProjectData[] = null;

  public userGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private userFormService: UserFormService) {
    this.userGroup = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      position: new FormControl(null, [Validators.required]),
      assignment: new FormControl(null, [Validators.required])
    });
   }

  ngOnInit() {
    // when the survice calls a GET request to DynamoDB, this displays the data
    this.userFormService.userReceived.subscribe((user) => {
      this.userData = user;
      this.userGroup.patchValue({
        name: this.userData.name,
        email: this.userData.email,
        position: this.userData.position,
        assignment: this.userData.assignment
      });
    });

    // listen if the Database has projects this user is working on
    this.userFormService.projectsReceived.subscribe((projects) => {
      this.associatedProjects = projects;
    });
  }

  private syncWithForm() {
    this.userData.name = this.userGroup.value.name;
    this.userData.email = this.userGroup.value.email;
    this.userData.position = this.userGroup.value.position;
    this.userData.assignment = this.userGroup.value.assignment;
  }

  public updateUser() {
    this.syncWithForm();
    this.userFormService.updateUser(this.userData);
  }

  public newUser() {
    const user: IUserData = {
      id: null,
      name: this.userGroup.value.name,
      email: this.userGroup.value.email,
      position: this.userGroup.value.position,
      assignment: this.userGroup.value.assignment
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
