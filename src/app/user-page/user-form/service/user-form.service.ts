import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IUserData } from 'src/app/profile-page/user-table/component/user-table.component';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {

  private getUserURL = 'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/users/get';
  private updateUserURL = 'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/users/update';
  private postUserURL = 'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/users/post';
  private deleteUserURL = 'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/users/delete';

  @Output() userReceived: EventEmitter<IUserData> = new EventEmitter();

  constructor(private http: HttpClient) { }

  public userSelected(userId: string) {
    const param = {
      'id': userId
    };
    this.http.post<IUserData>(this.getUserURL, param, {
       headers: new HttpHeaders().set('content-type', 'application/json')
      }).subscribe(
      res => this.userReceived.emit(res),
      err => console.log('Error occurred while fetching userData: ' + err.message)
    );
  }

  public updateUser(userData: IUserData) {
    this.http.post<IUserData>(this.updateUserURL, userData, {
      headers: new HttpHeaders().set('content-type', 'application/json')
     }).subscribe(
     res => location.reload(),
     err => console.log('Error occurred: ' + err.message)
   );
  }

  public postUser(userData: IUserData) {
    this.http.post<IUserData>(this.postUserURL, userData, {
      headers: new HttpHeaders().set('content-type', 'application/json')
     }).subscribe(
     res => location.reload(),
     err => console.log('Error occurred: ' + err.message)
   );
  }

  public deleteUser(userId: string) {
    const param = {
      'id': userId
    };
    this.http.post<IUserData>(this.deleteUserURL, param, {
      headers: new HttpHeaders().set('content-type', 'application/json')
     }).subscribe(
     res => location.reload(),
     err => console.log('Error occurred: ' + err.message)
   );
  }
}
