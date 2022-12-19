import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomService } from 'src/app/core/services/custom.service';
import { ProductCreateComponent } from '../product-create/product-create.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  public productsList: any;
  public isDeleted: boolean = false;
  public dataSource!: MatTableDataSource<any>;
  public displayedColumns: string[] = [
    'sno',
    'title',
    'description',
    'imageUrl',
    'subcategoryId',
    'price',
    'priceAfterDiscount',
    'priceDiscount',
    'quantity',
    'sold',
    // 'isOutOfStock',
    'ratingsAverage',
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
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.apiService.doGet('products/list').subscribe((res: any) => {
      if (res.type == "success") {
        this.productsList = res.data;
        this.dataSource = new MatTableDataSource<any>(this.productsList);
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
    this.apiService.doPost('products/status/' + status, payload)
      .subscribe((res: any) => {
        if (res.type == "success") {
          this.customService.openSnackBar(res.message);
          this.getAllProducts();
        } else {
          this.customService.openSnackBar(res.message);
        }
      });
  }

  openCreateProduct() {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      width: '90%',
      data: {
        title: 'Add Products',
        submit: 'Create'
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllProducts();
    });
  }

  openEditProduct(slug: any) {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      width: '90%',
      data: {
        title: 'Edit Products',
        productEditData: slug,
        submit: 'Update'
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllProducts();
    });
  }

  deleteProduct(index: number, e: any): void {
    const data = this.dataSource.data;
    data.splice(
      this.paginator.pageIndex * this.paginator.pageSize + index,
      1
    );
    this.dataSource.data = data;
    this.apiService.doDelete('products/delete/' + e.slug).subscribe((res: any) => {
      if (res.type == "success") {
        this.customService.openSnackBar(res.message);
      } else {
        this.customService.openSnackBar(res.message);
      }
    });
  }

}