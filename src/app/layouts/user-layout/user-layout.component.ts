import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomService } from 'src/app/core/services/custom.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {

  public mobileQuery: MediaQueryList;
  public userData: any;
  public productsList: any;
  public cartList: any;
  public cartListId: any;
  public cartPorductData: any;
  public cartCount: number = 0;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private apiService: ApiService,
    private customService: CustomService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.customService.cartItem.subscribe((cart: any) => this.cartCount = cart);
    const userInfo: any = localStorage.getItem('userInfo');
    this.userData = JSON.parse(userInfo);
    sessionStorage.setItem('userInfo', JSON.stringify(this.userData));
    this.getAllCarts();
    this.getAllProducts();
  }

  getAllCarts(): void {
    this.apiService.doGet('cart/list').subscribe((res: any) => {
      if (res.type = "success") {
        this.cartList = res.data;
        this.cartListId = this.cartList[0]._id;
        this.cartPorductData = this.cartList[0].products;
        for (let i = 0; i < this.cartPorductData.length; i++) {
          this.cartCount = this.cartPorductData.length;
          this.cartCount = this.cartCount;
        }
      } else {
        this.customService.openSnackBar(res.message);
      }
    });
  }

  getAllProducts(): void {
    this.apiService.doGet('products/all').subscribe((res: any) => {
      this.productsList = res.data;
      console.log("productsList=>", this.productsList)
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.apiService.clearStorageData();
    this.customService.openSnackBar("Logout successfully");
    this.router.navigate(['/user/auth']);
  }

}
