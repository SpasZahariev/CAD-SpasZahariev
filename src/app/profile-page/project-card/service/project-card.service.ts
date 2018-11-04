import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { IProjectData } from '../../project-table/component/project-table.component';

@Injectable({
  providedIn: 'root'
})

export class ProjectCardService {

  private getProjectURL = 'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/getProject';

  public projectId = null;

  @Output() change: EventEmitter<IProjectData> = new EventEmitter();
  constructor(private http: HttpClient) { }

  // public getProjects(): Observable<IProjectData[]> {
  //   return this.http.get<IProjectData[]>(this.getProjectsURL);
  // }

  // called when a project is clicked and pipes(emits) to the project Card
  projectSelected(projectId: string) {
    const param = {
      'id': projectId
    };
    this.http.post<IProjectData>(this.getProjectURL, param, {
       headers: new HttpHeaders().set('content-type', 'application/json')
      }).subscribe(
      res => this.change.emit(res),
      err => console.log('Error occurred: ' + err.message)
    );
  }
}
