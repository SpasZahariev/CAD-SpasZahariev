import { Component, OnInit, EventEmitter } from '@angular/core';
import { ProjectCardService } from '../service/project-card.service';
import { IProjectData } from '../../project-table/component/project-table.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserTableComponent } from '../../user-table/component/user-table.component';


@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

  public projectId: string = null;
  public projectData: IProjectData = null;

  public projectGroup: FormGroup;
  public nameForm = new FormControl('', [Validators.required]);
  public managerForm = new FormControl('', [Validators.required]);
  public statusForm = new FormControl('', [Validators.required]);
  // public projectName: string;
  // public projectManager: string;
  // public projectStatus: string;

  constructor(private projectCardService: ProjectCardService, private formBuilder: FormBuilder) {
    this.projectGroup = this.formBuilder.group({
      loatLabel: 'auto',
    });
  }

  public ngOnInit() {
    // listens for clicks on projects and populates fields with their data
    this.projectCardService.projectChanged.subscribe(data => {
      this.projectData = data;
      this.projectId = this.projectData.id;
    });

    // for adding developers to project
    this.projectCardService.selectedUsers.subscribe((users) => {
      // concat wont do the job, fix it
      console.log(users);
      // this.projectData.developers.concat(users);
      this.projectData.developers = users;
      console.log('Devs post concat: ');
      console.log(this.projectData.developers);
    });
  }

  public onSubmit(input: any) {
    // var buttonName = document.activeElement.getAttribute("Name");
    // idk
    console.log(input);
  }

  public requestDevs() {
    // append selected devs from user table
    // emit somehow so the userTable pushes the selected users
    this.projectCardService.requestFromUserTable();
  }
}
