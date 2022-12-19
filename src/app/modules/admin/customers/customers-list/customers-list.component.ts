import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomService } from 'src/app/core/services/custom.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  public usersList: any;
  public dataSource!: MatTableDataSource<any>;
  public displayedColumns: string[] = [
    'sno',
    'joiningdate',
    'username',
    'email'
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private apiService: ApiService,
    private customService: CustomService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.apiService.doGet('user/list')
      .subscribe((res: any) => {
        if (res.type == "success") {
          this.usersList = res.data;
          this.dataSource = new MatTableDataSource<any>(this.usersList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.customService.openSnackBar(res.message);
        }
      });
  }

}
