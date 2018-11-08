import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserData } from 'src/app/common/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})

export class UserTableService {

  private getUsersURL = 'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/users/get-all';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<IUserData[]> {
    return this.http.get<IUserData[]>(this.getUsersURL);
  }
}
