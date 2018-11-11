import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { IUserData } from 'src/app/common/interfaces/interfaces';
import { ProjectCardService } from '../../project-card/service/project-card.service';
import { UserTableService } from '../service/user-table.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  public displayedColumns: string[] = ['select', 'name', 'position', 'email', 'assignment'];
  public selection = new SelectionModel<IUserData>(true, []);
  public dataSource = new MatTableDataSource<IUserData>([]);
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  public constructor(private userTableService: UserTableService, private projectCardService: ProjectCardService) {}


  public ngOnInit() {
    // get all employees from DynamoDB
    this.userTableService.getUsers()
    .subscribe((users) => {
      (this.dataSource = new MatTableDataSource(users));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    // wait for a click to add users to project
    this.projectCardService.requestSelectedUsers.subscribe(() => {
      this.assignToProject();
    });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   /** Whether the number of selected elements matches the total number of rows. */
   public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // adds users to a project in dynamoDB
  // project-card-component calls this method
  public assignToProject() {
    const selectedDevs: IUserData[] = [];
    this.selection.selected.forEach((user) => {
      selectedDevs.push(user);
    });
    this.projectCardService.appendUsers(selectedDevs);
  }
}




