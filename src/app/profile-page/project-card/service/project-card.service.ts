import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { IProjectData } from '../../project-table/component/project-table.component';
import { IUserData } from '../../user-table/component/user-table.component';

@Injectable({
  providedIn: 'root'
})

export class ProjectCardService {

  private getProjectURL = 'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/getProject';
  private postProjectURL = 'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/postProject';
  private updateProjectURL = 'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/updateProject';

  public projectId = null;

  @Output() projectChanged: EventEmitter<IProjectData> = new EventEmitter();
  @Output() selectedUsers: EventEmitter<IUserData[]> = new EventEmitter();
  @Output() requestSelectedUsers: EventEmitter<null> = new EventEmitter();

  public developers: IUserData[] = [];
  constructor(private http: HttpClient) { }

  // called when a project is clicked and pipes(emits) to the project Card
  public projectSelected(projectId: string) {
    const param = {
      'id': projectId
    };
    this.http.post<IProjectData>(this.getProjectURL, param, {
       headers: new HttpHeaders().set('content-type', 'application/json')
      }).subscribe(
      res => this.projectChanged.emit(res),
      err => console.log('Error occurred: ' + err.message)
    );
  }

  // project-card-component listens to changes in selectedusers
  public appendUsers(users: IUserData[]) {
    this.selectedUsers.emit(users);
  }

  public requestFromUserTable() {
    this.requestSelectedUsers.emit();
  }

  // need to reload page when this is successful
  public updateProject(projectData: IProjectData) {
    this.http.post<IProjectData>(this.updateProjectURL, projectData, {
       headers: new HttpHeaders().set('content-type', 'application/json')
      }).subscribe(
      res => location.reload(),
      err => console.log('Error occurred: ' + err.message)
    );
  }
}
