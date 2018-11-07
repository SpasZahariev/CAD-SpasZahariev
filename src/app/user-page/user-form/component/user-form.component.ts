import { Component, OnInit } from '@angular/core';
import { IUserData } from 'src/app/profile-page/user-table/component/user-table.component';
import { FormGroup, FormBuilder, FormControl, Validators, EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  public userData: IUserData = null;

  public userGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.userGroup = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      position: new FormControl(null, [Validators.required]),
      assignment: new FormControl(null, [Validators.required])
    });
   }

  ngOnInit() {
  }

  public updateUser() {
    console.log(this.userGroup.value.email);
  }

  public isFormValid(): boolean {
    return this.userGroup.valid;
  }

}
