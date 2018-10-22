import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetHelloService } from '../get-hello.service';

export interface HelloAbstract {
  message: string;
}

@Component({
  selector: 'app-get-hello',
  templateUrl: './get-hello.component.html',
  styleUrls: ['./get-hello.component.css']
})
export class GetHelloComponent implements OnInit {

  // public message$: Observable<String>;
  public finalMessages: HelloAbstract[] = [];

  constructor(private http: HttpClient, private helloService: GetHelloService) { }

  ngOnInit() {
    this.showConfig();
  }

  showConfig() {
    // this.finalMessage = [{
    //   message: 'pls show me something',
    // }];
    // console.log('BEFORE ' + this.finalMessages);
    this.helloService.getJSON()
      .subscribe((data) => {
        data.forEach(element => {
          this.finalMessages.push({
            message: element.message,
          });
        });
        console.log(this.finalMessages);
      });
  }

}

// this.finalMessage = {
//   // ...data
//     // message: data.message,
//     hello: data['message'],
// });
