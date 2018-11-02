import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HelloAbstract, UserData } from '../component/get-hello.component';

@Injectable({
  providedIn: 'root'
})

export class GetHelloService {

  private testURL = 'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/image-resize';
  private getUsersURL = 'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/getUsers';
  private postUserURL = 'https://b7z59sf105.execute-api.eu-west-1.amazonaws.com/dev/postUser';

  constructor(private http: HttpClient) { }

  /** GET heroes from the server */
  public getJSON(): Observable<HelloAbstract[]> {
    return this.http.get<HelloAbstract[]>(this.testURL);
  }

  public getUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.getUsersURL);
  }

  public postUser(name: string, email?: string, position?: string, assignment?: string) {
    const newUser: UserData = {
      name: name,
      email: email,
      position: position,
      assignment: assignment
    };
    this.http.post<UserData>(this.postUserURL, newUser, {
       headers: new HttpHeaders().set('content-type', 'application/json')
      }).subscribe(
      res => console.log('Result: ' + res),
      err => console.log('Error occurred: ' + err.message)
    );
  }
}
