import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import {SelectionModel} from '@angular/cdk/collections';
import { GetHelloService } from 'src/app/get-hello/service/get-hello.service';
import { UserTableService } from 'src/app/profile-page/user-table/service/user-table.service';
/**
 * @title Table with expandable rows
 */

export interface IUserData {
  id: string;
  name: string;
  position: string;
  email: string;
  assignment: string;
}

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.css']
})
export class UserSelectorComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'position', 'email', 'assignment'];
  public dataSource = new MatTableDataSource<IUserData>([]);
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  // public constructor(private userTableService: UserTableService) {}
  public constructor(private userTableService: UserTableService) {}


  public ngOnInit() {
    // get all employees from DynamoDB
    this.userTableService.getUsers()
    .subscribe((users) => {
      (this.dataSource = new MatTableDataSource(users));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    // // wait for a click to add users to project
    // this.projectCardService.requestSelectedUsers.subscribe(() => {
    //   this.assignToProject();
    // });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}




