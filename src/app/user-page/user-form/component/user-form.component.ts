import { Component, OnInit } from '@angular/core';
import { IUserData } from 'src/app/profile-page/user-table/component/user-table.component';
import { FormGroup, FormBuilder, FormControl, Validators, EmailValidator } from '@angular/forms';
import { UserFormService } from '../service/user-form.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  public userData: IUserData = null;

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
      console.log(user);
      this.userData = user;
      this.userGroup.patchValue({
        name: this.userData.name,
        email: this.userData.email,
        position: this.userData.position,
        assignment: this.userData.assignment
      });
    });
  }

  public updateUser() {
    console.log(this.userGroup.value.email);
  }

  public isFormValid(): boolean {
    return this.userGroup.valid;
  }

}
