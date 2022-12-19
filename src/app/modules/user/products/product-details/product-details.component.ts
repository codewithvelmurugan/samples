import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomService } from 'src/app/core/services/custom.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {

  public productsDetailsList: any;
  public productSlug: any;
  public cartItemData: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private customService: CustomService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.productSlug = params.get('slug');
      this.getAllProducts();
    });
  }

  ngAfterViewInit() {
  }

  getAllProducts(): void {
    this.apiService.doGet('products/read/' + this.productSlug).subscribe((res: any) => {
      if (res.type = "success") {
        this.productsDetailsList = res.data;
        localStorage.setItem('productData', this.productsDetailsList._id);
      } else {
        this.customService.openSnackBar(res.message);
      }
    });
  }

  addtocart(): void {
    const payload = {
      productId: this.productsDetailsList._id,
      quantity: 1
    }
    this.apiService.doPost('cart/add', payload).subscribe((res: any) => {
      if (res.type = "success") {
        this.cartItemData = res.data;
        this.router.navigate(['/user/shopping-cart']);
      } else {
        this.customService.openSnackBar(res.message);
      }
    });
  }

  gotocart() {
    this.router.navigate(['/user/shopping-cart']);
  }

  buyNow() {
    this.router.navigate(['/user/shopping-cart/checkout']);
  }

}
