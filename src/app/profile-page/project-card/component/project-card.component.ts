import { Component, OnInit } from '@angular/core';
import { ProjectCardService } from '../service/project-card.service';
import { IProjectData } from '../../project-table/component/project-table.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// import { EventEmitter } from 'protractor';

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
  // public devsRequired: EventEmitter = new EventEmitter();

  constructor(private projectCardService: ProjectCardService, private formBuilder: FormBuilder) {
    this.projectGroup = this.formBuilder.group({
      loatLabel: 'auto',
    });
  }

  // listens for clicks on projects and populates fields with their data
  public ngOnInit() {
    this.projectCardService.projectChanged.subscribe(data => {
      // this.projectId = projectId;
      // this.projectGroup.reset();
      this.projectData = data;
      this.projectId = this.projectData.id;
    });
  }

  public onSubmit(input: any) {
    // var buttonName = document.activeElement.getAttribute("Name");
    // idk
    console.log(input);
  }

  public addDevs() {
    // append selected devs from user table
    // emit somehow so the userTable pushes the selected users
  }
}
