import { Component, OnInit, EventEmitter } from '@angular/core';
import { ProjectCardService } from '../service/project-card.service';
import { IProjectData } from '../../project-table/component/project-table.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserTableComponent, IUserData } from '../../user-table/component/user-table.component';
import { forEach } from '@angular/router/src/utils/collection';


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

  constructor(private projectCardService: ProjectCardService, private formBuilder: FormBuilder) {
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
    });

    // for adding developers to project
    this.projectCardService.selectedUsers.subscribe((users) => {
      const devEmails = [];
      this.projectData.developers.forEach((dev) => devEmails.push(dev.email));
      // check and don't add duplicates
      users.forEach((user) => {
        // could implement check if user is manager or admin
        if (devEmails.indexOf(user.email) === -1) {
          this.projectData.developers.push(user);
          this.devsAdded = true;
          }
        }
      );

    });
  }

  // posts changes to DynamoDB
  public update() {
    this.projectData.name = this.nameForm.value;
    // todo check if valid manager
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
