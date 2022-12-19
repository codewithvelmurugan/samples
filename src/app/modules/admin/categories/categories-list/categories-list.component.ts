import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomService } from 'src/app/core/services/custom.service';
import { CategoryCreateComponent } from '../category-create/category-create.component';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  public categoriesList: any = [];
  public isDeleted: boolean = false;
  public dataSource!: MatTableDataSource<any>;
  public displayedColumns: string[] = [
    'sno',
    'imageUrl',
    'name',
    'status',
    'action',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private apiService: ApiService,
    private customService: CustomService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.apiService.doGet('categories/list')
      .subscribe((res: any) => {
        if (res.type == "success") {
          this.categoriesList = res.data;
          this.dataSource = new MatTableDataSource<any>(this.categoriesList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.customService.openSnackBar(res.message);
        }
      });
  }

  onChangetoggle(event: MatSlideToggleChange, status: any) {
    this.isDeleted = event.checked;
    const payload = {
      isDeleted: this.isDeleted
    }
    this.apiService.doPost('categories/status/' + status, payload)
      .subscribe((res: any) => {
        if (res.type == "success") {
          this.customService.openSnackBar(res.message);
          this.getAllCategories();
        } else {
          this.customService.openSnackBar(res.message);
        }
      });
  }

  openCreateCategory() {
    const dialogRef = this.dialog.open(CategoryCreateComponent, {
      width: '500px',
      data: {
        title: 'Add Category',
        submit: 'Create'
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllCategories();
    });
  }

  openEditCategory(slug: any) {
    const dialogRef = this.dialog.open(CategoryCreateComponent, {
      width: '500px',
      data: {
        title: 'Edit Category',
        categoryEditData: slug,
        submit: 'Update'
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllCategories();
    });
  }

  deleteCategory(index: number, e: any): void {
    const data = this.dataSource.data;
    data.splice(
      this.paginator.pageIndex * this.paginator.pageSize + index,
      1
    );
    this.dataSource.data = data;
    this.apiService.doDelete('categories/delete/' + e.slug).subscribe((res: any) => {
      if (res.type = "success") {
        this.customService.openSnackBar(res.message);
      } else {
        this.customService.openSnackBar(res.message);
      }
    });
  }

}
