import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public message$: any;

  constructor(private http: HttpClient) { }



  public sendAlert(): void {
  }



  ngOnInit() {
    console.log('so this is here...');
    const api_endpoint = 'https://1bajuu1mbi.execute-api.eu-west-2.amazonaws.com/beta/get-hello';
    this.message$ = this.http.get<String>(api_endpoint).subscribe(
      x => console.log('Observer got a next value: ' + x),
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    );
    console.log(this.message$);
  }
}
