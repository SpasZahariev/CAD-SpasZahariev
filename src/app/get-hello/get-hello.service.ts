import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HelloAbstract, UserData } from './component/get-hello.component';

@Injectable({
  providedIn: 'root'
})

export class GetHelloService {

  private testURL = 'https://4ya1z21e38.execute-api.eu-west-1.amazonaws.com/dev/image-resize';
  private getUsersURL = 'https://4ya1z21e38.execute-api.eu-west-1.amazonaws.com/dev/returnAll';
  private postUserURL = 'https://4ya1z21e38.execute-api.eu-west-1.amazonaws.com/dev/users';

  constructor(private http: HttpClient) { }

  /** GET heroes from the server */
  public getJSON(): Observable<HelloAbstract[]> {
    return this.http.get<HelloAbstract[]>(this.testURL);
  }

  public getUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.getUsersURL);
  }

  public postUser(userName: string) {
  //   Item: {
  //     id: uuid.v1(),
  //     name: data.name,
  //     email: data.email,
  //     position: data.position,
  //     assignement: data.assignement,
  // }
    const testUser: UserData = {
      name: userName,
      email: null,
      position: null,
      assignment: null
    };
    this.http.post<UserData>(this.postUserURL, testUser, {
       headers: new HttpHeaders().set('content-type', 'application/json')
      }).subscribe(
      res => console.log('Result: ' + res),
      err => console.log('Error occurred: ' + err.message)
    );
  }
}
