import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from '../component/expanding-table.component';

@Injectable({
  providedIn: 'root'
})

export class UserTableService {

  private getUsersURL = 'https://4ya1z21e38.execute-api.eu-west-1.amazonaws.com/dev/returnAll';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.getUsersURL);
  }
}
