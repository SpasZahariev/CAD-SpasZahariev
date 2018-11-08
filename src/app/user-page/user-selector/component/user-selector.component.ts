import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { IUserData } from 'src/app/common/interfaces/interfaces';
import { UserTableService } from 'src/app/dashboard-page/user-table/service/user-table.service';
import { UserFormService } from '../../user-form/service/user-form.service';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.css']
})
export class UserSelectorComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'position', 'email', 'assignment'];
  public dataSource = new MatTableDataSource<IUserData>([]);
  private selectedRowIndex = -1;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  public constructor(private userTableService: UserTableService, private userFormService: UserFormService) {}


  public ngOnInit() {
    // get all employees from DynamoDB
    this.userTableService.getUsers()
    .subscribe((users) => {
      (this.dataSource = new MatTableDataSource(users));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // highlights the clicked row
  public highlight(row: any) {
    this.selectedRowIndex = row.id;
    this.userFormService.userSelected(row.id);
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}




