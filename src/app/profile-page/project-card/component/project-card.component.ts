import { Component, OnInit } from '@angular/core';
import { ProjectCardService } from '../service/project-card.service';
import { IProjectData } from '../../project-table/component/project-table.component';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

  public projectId: string = null;
  public projectData: IProjectData = null;

  projectGroup: FormGroup;
  // public nameForm: FormControl;
  // public managerForm: FormControl;
  // public statusForm: FormControl;
  // public projectName: string;
  // public projectManager: string;
  // public projectStatus: string;

  constructor(private projectCardService: ProjectCardService, private formBuilder: FormBuilder) { }

  // listens for clicks on projects and populates fields with their data
  public ngOnInit() {
    this.createForm();
    this.projectCardService.change.subscribe(data => {
      // this.projectId = projectId;
      this.projectData = data;
      this.projectId = this.projectData.id;
    });
  }

  private createForm() {
    this.projectGroup = this.formBuilder.group({
    manager: new FormControl(''),
    name: new FormControl(''),
    status: new FormControl(''),
    });

  }

  public onSubmit() {
    // idk
  }

}
