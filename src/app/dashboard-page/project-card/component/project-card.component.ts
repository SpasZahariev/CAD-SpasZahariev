import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IAccessCookie, IProjectData } from 'src/app/common/interfaces/interfaces';
import { ProjectCardService } from '../service/project-card.service';
import { SendEmailService } from 'src/app/common/services/send-email.service';


@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})

export class ProjectCardComponent implements OnInit {

  public projectId: string = null;
  public projectData: IProjectData = null;

  public projectGroup: FormGroup;
  public nameForm = new FormControl(null, [Validators.required]);
  public managerForm = new FormControl(null, [Validators.required]);
  public statusForm = new FormControl(null, [Validators.required]);
  public devsAdded = false;
  // new members are sent an email to notify them that they are added to a project
  private newProjectMembers: string[] = [];

  private cookie: IAccessCookie = null;
  private isCookieSet = false;

  constructor(
    private projectCardService: ProjectCardService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private router: Router,
    private sendEmailService: SendEmailService) {
    this.projectGroup = this.formBuilder.group({
      loatLabel: 'auto',
    });
  }

  public ngOnInit() {
    // listens for clicks on projects and populates fields with their data
    this.projectCardService.projectChanged.subscribe(data => {
      this.projectData = data;
      this.nameForm.setValue(this.projectData.name);
      this.managerForm.setValue(this.projectData.manager);
      this.statusForm.setValue(this.projectData.status);
      this.projectId = this.projectData.id;
      if (!this.isCookieSet) {
        this.cookie = JSON.parse(this.cookieService.get('accessCookie'));
        this.isCookieSet = true;
      }
      this.adjustForms();
    });

    // for adding developers to project
    this.projectCardService.selectedUsers.subscribe((users) => {

      // reset the list of new members
      this.newProjectMembers = [];
      const devEmails = [];
      this.projectData.developers.forEach((dev) => devEmails.push(dev.email));
      // checks and does not add duplicates
      users.forEach((user) => {
        if (devEmails.indexOf(user.email) === -1) {
          this.projectData.developers.push(user);
          this.newProjectMembers.push(user.email);
          this.devsAdded = true;
          }
        }
      );
    });
  }

  // enable or disable form controls depending on user position
  private adjustForms() {
    if (this.isManager()) {
      this.nameForm.enable();
      this.managerForm.enable();
      this.statusForm.enable();
    } else {
      this.nameForm.disable();
      this.managerForm.disable();
      this.statusForm.disable();
    }
  }

  // set the local Project Data to the form field values
  private syncWithForms() {
    this.projectData.name = this.nameForm.value;
    this.projectData.manager = this.managerForm.value;
    this.projectData.status = this.statusForm.value;
  }

  // admin should be like a super user with access to everything
  public isManager(): boolean {
    return (this.cookie.position === 'Project Manager') || (this.cookie.position === 'Admin');
  }

  // posts changes to DynamoDB and emails new members
  public update() {
    this.syncWithForms();
    if (this.devsAdded && this.newProjectMembers.length > 0) {
      const message: string = 'you have been added to project: ' + this.projectData.name;
      this.sendEmailService.sendMultiple(this.newProjectMembers, this.projectData.manager, message);
    }
    this.devsAdded = false;
    this.projectCardService.updateProject(this.projectData);
  }

  public requestDevs() {
    // append selected devs from user table component
    // it will later push the Ticked users to the card
    this.projectCardService.requestFromUserTable();
  }

  // clears all devs from project only on client side
  public clearDevs() {
    this.projectData.developers = [];
  }

  public deleteProject() {
    this.projectCardService.deleteProjectInDynamo(this.projectData.id);
  }

  public addProject() {
    this.syncWithForms();
    this.projectCardService.postProject(this.projectData);
  }

  public isValid(): boolean {
    return this.nameForm.value.valid && this.managerForm.value.valid && this.statusForm.value.valid && this.devsAdded;
  }

  // sends emails of all listed empliyees in a project and sends them to email-page
  public emailAssigned() {
    if (this.projectData.developers.length === 0) {
      return;
    }
    const emails: string[] = [];
    this.projectData.developers.map((dev) => {
      emails.push(dev.email);
    });
    localStorage.setItem('emails', JSON.stringify(emails));
    this.router.navigate(['/', 'email-page']);
  }
}
