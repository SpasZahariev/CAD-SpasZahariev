import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectCardService } from '../service/project-card.service';
import { IProjectData, IAccessCookie } from 'src/app/common/interfaces/interfaces';
import { CookieService } from 'ngx-cookie-service';


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

  private cookie: IAccessCookie = null;
  private isCookieSet = false;

  constructor(private projectCardService: ProjectCardService, private formBuilder: FormBuilder, private cookieService: CookieService) {
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
      const devEmails = [];
      this.projectData.developers.forEach((dev) => devEmails.push(dev.email));
      // checks and does not add duplicates
      users.forEach((user) => {
        if (devEmails.indexOf(user.email) === -1) {
          this.projectData.developers.push(user);
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

  // admin should be like a super user with access to everything
  public isManager(): boolean {
    return (this.cookie.position === 'Project Manager') || (this.cookie.position === 'Admin');
  }

  // posts changes to DynamoDB
  public update() {
    this.projectData.name = this.nameForm.value;
    this.projectData.manager = this.managerForm.value;
    this.projectData.status = this.statusForm.value;
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
    this.projectCardService.postProject(this.projectData);
  }

  public isValid(): boolean {
    return this.nameForm.value.valid && this.managerForm.value.valid && this.statusForm.value.valid && this.devsAdded;
  }
}
