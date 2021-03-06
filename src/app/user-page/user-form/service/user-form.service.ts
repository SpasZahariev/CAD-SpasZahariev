import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { IProjectData, IUserData, IAccessCookie } from 'src/app/common/interfaces/interfaces';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  private getUserURL =
    'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/users/get';
  private updateUserURL =
    'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/users/update';
  private postUserURL =
    'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/users/post';
  private deleteUserURL =
    'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/users/delete';
  private queryProjectsURL =
    'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/projects/query';
  private queryByEmailURL =
    'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/users/queryByEmail';
  private postToCognitoURL =
    'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/users/postToCognito';

  @Output() userReceived: EventEmitter<IUserData> = new EventEmitter();
  @Output() projectsReceived: EventEmitter<IProjectData> = new EventEmitter();
  @Output() loginReceived: EventEmitter<IUserData> = new EventEmitter();

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // after user is fetched, get the projects associated with this user
  private requestAssociatedProjects(userData: IUserData) {
    this.http
      .post<IProjectData>(this.queryProjectsURL, userData, {
        headers: new HttpHeaders().set('content-type', 'application/json')
      })
      .subscribe(
        res => this.projectsReceived.emit(res),
        err =>
          console.log('Error occurred while fetching userData: ' + err.message)
      );
  }

  public userSelected(userId: string) {
    const param = {
      id: userId
    };
    this.http
      .post<IUserData>(this.getUserURL, param, {
        headers: new HttpHeaders().set('content-type', 'application/json')
      })
      .subscribe(
        res => {
          this.userReceived.emit(res);
          this.requestAssociatedProjects(res);
        },
        err =>
          console.log('Error occurred while fetching userData: ' + err.message)
      );
  }

  public updateUser(userData: IUserData) {
    this.http
      .post<IUserData>(this.updateUserURL, userData, {
        headers: new HttpHeaders().set('content-type', 'application/json')
      })
      .subscribe(
        res => location.reload(),
        err => console.log('Error occurred: ' + err.message)
      );
  }

  public postToUserPool (email: string) {
    const emailParam = {
      email: email
    };
    // creating user entry in Cognito User Pool
    this.http
      .post(this.postToCognitoURL, emailParam, {
        headers: new HttpHeaders().set('content-type', 'application/json')
      })
      .subscribe(
        res => console.log(res),
        err => console.log('Error occurred: ' + err.message)
      );
  }

  // if a stopReload parameter is given && true don't reload
  public postUser(userData: IUserData, stopReload?: boolean) {
    this.postToUserPool(userData.email);
    // creating user entry in DynamoDB
    this.http
      .post<IUserData>(this.postUserURL, userData, {
        headers: new HttpHeaders().set('content-type', 'application/json')
      })
      .subscribe(
        res => {
          if (stopReload) {
            return;
          }
          location.reload();
        },
        err => console.log('Error occurred: ' + err.message)
      );
  }

  public deleteUser(userId: string) {
    const param = {
      id: userId
    };
    this.http
      .post<IUserData>(this.deleteUserURL, param, {
        headers: new HttpHeaders().set('content-type', 'application/json')
      })
      .subscribe(
        res => location.reload(),
        err => console.log('Error occurred: ' + err.message)
      );
  }

  // queries the user table for entries with this email => there should be only one user with this email
  public queryUsersByEmail(userEmail: string) {
    const param = {
      email: userEmail
    };
    this.http
      .post<IUserData>(this.queryByEmailURL, param, {
        headers: new HttpHeaders().set('content-type', 'application/json')
      })
      .subscribe(
        res => {
          this.setAccessCookie(res[0]);
        },
        err => console.log('Error occurred while fetching userData: ' + err.message)
      );
  }

  private setAccessCookie(userData: IUserData) {
    const cookie: IAccessCookie = {
      email: userData.email,
      position: userData.position
    };
    const expiredDate = new Date();
    expiredDate.setDate( expiredDate.getDate() + 10 );
    if (this.cookieService.get('accessCookie')) {
      return;
    }
    this.cookieService.set('accessCookie', JSON.stringify(cookie), expiredDate);
  }
}
