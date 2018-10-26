import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetHelloService } from '../get-hello.service';

import {MatTableDataSource} from '@angular/material';

export interface HelloAbstract {
  message: string;
}

export interface UserData {
  checked: boolean;
  createdAt: number;
  text: string;
  id: string;
  updatedAt: number;
}

@Component({
  selector: 'app-get-hello',
  templateUrl: './get-hello.component.html',
  styleUrls: ['./get-hello.component.css']
})
export class GetHelloComponent implements OnInit {

  // public message$: Observable<String>;
  public finalMessages: HelloAbstract[] = [];

  public users: UserData[] = [];

  public displayedColumns: string[] = ['id', 'checked', 'createdAt', 'text', 'updatedAt'];
  public dataSource = new MatTableDataSource([]);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
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

    this.helloService.getUsers()
    .subscribe((data) => {
      data.map((element) => {
        this.users.push({
          checked: element.checked,
          createdAt: element.createdAt,
          text: element.text,
          id: element.id,
          updatedAt: element.updatedAt,
        });
        this.dataSource = new MatTableDataSource(this.users);
        console.log(this.users);
      });
    });
  }

}

// this.finalMessage = {
//   // ...data
//     // message: data.message,
//     hello: data['message'],
// });
