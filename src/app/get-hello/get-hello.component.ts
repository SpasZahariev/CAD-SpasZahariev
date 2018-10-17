import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-get-hello',
  templateUrl: './get-hello.component.html',
  styleUrls: ['./get-hello.component.css']
})
export class GetHelloComponent implements OnInit {

  // public message$: Observable<String>;
  public message: String = '[temp for now]';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // console.log('so this is here...');
    // const api_endpoint = 'https://1bajuu1mbi.execute-api.eu-west-2.amazonaws.com/beta/get-hello';
    // this.message$ = this.http.get<String>(api_endpoint);
    // console.log(this.message$);
  }

}
