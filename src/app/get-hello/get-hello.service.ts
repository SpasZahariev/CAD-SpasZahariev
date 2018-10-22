import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HelloAbstract } from './component/get-hello.component';

@Injectable({
  providedIn: 'root'
})

export class GetHelloService {

  // private testURL = 'https://ex5ucwpo2g.execute-api.eu-west-2.amazonaws.com/production/imageResize';
  private testURL = 'https://lw923tw1gj.execute-api.eu-west-2.amazonaws.com/dev/imageResize';
  // private testURL = 'https://lw923tw1gj.execute-api.eu-west-2.amazonaws.com/dev/default';
  // private testURL = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) { }

  /** GET heroes from the server */
  public getJSON(): Observable<HelloAbstract[]> {
    // console.log(this.http.get<HelloAbstract[]>(this.testURL));
    return this.http.get<HelloAbstract[]>(this.testURL);
  }
}
