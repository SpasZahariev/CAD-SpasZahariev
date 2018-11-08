import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProjectData } from 'src/app/common/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})

export class ProjectTableService {

  private getProjectsURL = 'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/projects/get-all';

  constructor(private http: HttpClient) { }

  public getProjects(): Observable<IProjectData[]> {
    return this.http.get<IProjectData[]>(this.getProjectsURL);
  }
}
