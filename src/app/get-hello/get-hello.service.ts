import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HelloAbstract, UserData } from './component/get-hello.component';

@Injectable({
  providedIn: 'root'
})

export class GetHelloService {

  private testURL = 'https://t2lpnjag86.execute-api.eu-west-2.amazonaws.com/dev/image-resize';
  private userURL = 'https://t2lpnjag86.execute-api.eu-west-2.amazonaws.com/dev/returnAll';

  constructor(private http: HttpClient) { }

  /** GET heroes from the server */
  public getJSON(): Observable<HelloAbstract[]> {
    // console.log(this.http.get<HelloAbstract[]>(this.testURL));
    return this.http.get<HelloAbstract[]>(this.testURL);
  }

  public getUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.userURL);
  }
}
