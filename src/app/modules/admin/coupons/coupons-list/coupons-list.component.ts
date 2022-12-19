import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomService } from 'src/app/core/services/custom.service';
import { CouponCreateComponent } from '../coupon-create/coupon-create.component';

@Component({
  selector: 'app-coupons-list',
  templateUrl: './coupons-list.component.html',
  styleUrls: ['./coupons-list.component.scss']
})
export class CouponsListComponent implements OnInit {

  public couponsList: any;
  public dataSource!: MatTableDataSource<any>;
  public displayedColumns: string[] = [
    'sno',
    'code',
    'discount',
    'expiryDate',
    'action'
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private apiService: ApiService,
    private customService: CustomService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllCoupons();
  }

  getAllCoupons() {
    this.apiService.doGet('coupon/list')
      .subscribe((res: any) => {
        if (res.type == "success") {
          this.couponsList = res.data;
          this.dataSource = new MatTableDataSource<any>(this.couponsList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.customService.openSnackBar(res.message);
        }
      });
  }

  openCreateCoupon() {
    const dialogRef = this.dialog.open(CouponCreateComponent, {
      width: '500px',
      data: {
        title: 'Add Coupon',
        submit: 'Create'
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllCoupons();
    });
  }

  deleteCoupon(index: number, e: any): void {
    const data = this.dataSource.data;
    data.splice(
      this.paginator.pageIndex * this.paginator.pageSize + index,
      1
    );
    this.dataSource.data = data;
    this.apiService.doDelete('coupon/delete/' + e._id).subscribe((res: any) => {
      if (res.type = "success") {
        this.customService.openSnackBar(res.message);
      } else {
        this.customService.openSnackBar(res.message);
      }
    });
  }

}
