import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import {SelectionModel} from '@angular/cdk/collections';
import { GetHelloService } from 'src/app/get-hello/service/get-hello.service';
import { UserTableService } from '../service/user-table.service';
/**
 * @title Table with expandable rows
 */

export interface UserData {
  name: string;
  position: string;
  email: string;
  assignment: string;
}

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  public displayedColumns: string[] = ['select', 'name', 'position', 'email', 'assignment'];
  public selection = new SelectionModel<UserData>(true, []);
  public dataSource = new MatTableDataSource<UserData>([]);
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  constructor(private userTableService: UserTableService) {}

  ngOnInit() {
    this.userTableService.getUsers()
    .subscribe((users) => {
      (this.dataSource = new MatTableDataSource(users));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
}




