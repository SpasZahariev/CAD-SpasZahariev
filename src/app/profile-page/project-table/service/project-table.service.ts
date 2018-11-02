import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProjectData } from '../component/project-table.component';

@Injectable({
  providedIn: 'root'
})

export class ProjectTableService {

  private getProjectsURL = 'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/getProjects';

  constructor(private http: HttpClient) { }

  public getProjects(): Observable<IProjectData[]> {
    return this.http.get<IProjectData[]>(this.getProjectsURL);
  }
}
