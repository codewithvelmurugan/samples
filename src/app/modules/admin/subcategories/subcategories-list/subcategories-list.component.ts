import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomService } from 'src/app/core/services/custom.service';
import { SubcategoryCreateComponent } from '../subcategory-create/subcategory-create.component';

@Component({
  selector: 'app-subcategories-list',
  templateUrl: './subcategories-list.component.html',
  styleUrls: ['./subcategories-list.component.scss']
})
export class SubcategoriesListComponent implements OnInit {

  public subcategoriesList: any = [];
  public isDeleted: boolean = false;
  public dataSource!: MatTableDataSource<any>;
  public displayedColumns: string[] = [
    'sno',
    'name',
    'parentId',
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
    this.getAllSubcategories();
  }

  getAllSubcategories(): void {
    this.apiService.doGet('subcategories/list')
      .subscribe((res: any) => {
        if (res.type == "success") {
          this.subcategoriesList = res.data;
          this.dataSource = new MatTableDataSource<any>(this.subcategoriesList);
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
    this.apiService.doPost('subcategories/status/' + status, payload)
      .subscribe((res: any) => {
        if (res.type == "success") {
          this.customService.openSnackBar(res.message);
          this.getAllSubcategories();
        } else {
          this.customService.openSnackBar(res.message);
        }
      });
  }

  openCreateSubcategory() {
    const dialogRef = this.dialog.open(SubcategoryCreateComponent, {
      width: '500px',
      data: {
        title: 'Add Subcategory',
        submit: 'Create'
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllSubcategories();
    });
  }

  openEditSubcategory(slug: any) {
    const dialogRef = this.dialog.open(SubcategoryCreateComponent, {
      width: '500px',
      data: {
        title: 'Edit Subcategory',
        subcategoryEditData: slug,
        submit: 'Update'
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllSubcategories();
    });
  }

  deleteSubcategory(index: number, e: any): void {
    const data = this.dataSource.data;
    data.splice(
      this.paginator.pageIndex * this.paginator.pageSize + index,
      1
    );
    this.dataSource.data = data;
    this.apiService.doDelete('subcategories/delete/' + e.slug).subscribe((res: any) => {
      if (res.type == "success") {
        this.customService.openSnackBar(res.message);
      } else {
        this.customService.openSnackBar(res.message);
      }
    });
  }

}
