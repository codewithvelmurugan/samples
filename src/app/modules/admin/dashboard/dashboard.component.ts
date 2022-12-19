import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomService } from 'src/app/core/services/custom.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public productsList: any;
  public productsCount: number = 0;
  public usersList: any;
  public usersCount: number = 0;

  constructor(
    private apiService: ApiService,
    private customService: CustomService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllUsers();
  }

  getAllProducts(): void {
    this.apiService.doGet('products/list').subscribe((res: any) => {
      if (res.type == "success") {
        this.productsList = res.data;
        console.log("productsList =>", this.productsList)
        this.productsCount = this.productsList.length;
      } else {
        this.customService.openSnackBar(res.message);
      }
    });
  }

  getAllUsers() {
    this.apiService.doGet('user/list')
      .subscribe((res: any) => {
        if (res.type == "success") {
          this.usersList = res.data;
          this.usersCount = this.usersList.length;
        } else {
          this.customService.openSnackBar(res.message);
        }
      });
  }

}
