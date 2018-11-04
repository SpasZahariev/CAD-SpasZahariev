import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, Output, HostListener } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { GetHelloService } from 'src/app/get-hello/service/get-hello.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ProjectTableService } from '../service/project-table.service';
import { EventEmitter } from 'protractor';
import { ProjectCardService } from '../../project-card/service/project-card.service';
/**
 * @title Table with expandable rows
 */

export interface IProjectData {
  id: string;
  name: string;
  status: string;
  manager: string;
  developers: string[];
}

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'status', 'manager'];
  public selection = new SelectionModel<IProjectData>(true, []);
  public dataSource = new MatTableDataSource<IProjectData>([]);
  public selectedRowIndex = -1;
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  constructor(private projectTableService: ProjectTableService, private projectCardService: ProjectCardService) {}

  ngOnInit() {
    this.projectTableService.getProjects()
    .subscribe((users) => {
      (this.dataSource = new MatTableDataSource(users));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  // sends the project id to a service that the project Card component is subscribed to
  public highlight(row: any) {
    this.selectedRowIndex = row.id;
    this.projectCardService.projectSelected(row.id);
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}