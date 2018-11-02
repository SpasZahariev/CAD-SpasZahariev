import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from '../component/user-table.component';

@Injectable({
  providedIn: 'root'
})

export class UserTableService {

  private getUsersURL = 'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/getUsers';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.getUsersURL);
  }
}
