import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomService } from 'src/app/core/services/custom.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  public nocart: any = "assets/images/no-cart.png";
  public productId: any;
  public cartList: any;
  public cartPorductData: any;
  public isShowCartItem: boolean = false;
  public totalAmount: number = 0;
  public cartListId: any;
  public cartCount: any;


  constructor(
    private router: Router,
    private apiService: ApiService,
    private customService: CustomService
  ) {
    this.productId = localStorage.getItem('productData');
  }

  ngOnInit(): void {
    this.getAllCarts();
  }

  getAllCarts(): void {
    this.apiService.doGet('cart/list').subscribe((res: any) => {
      if (res.type = "success") {
        this.cartList = res.data;
        this.cartListId = this.cartList[0]._id;
        this.getCartTotal();
      } else {
        this.customService.openSnackBar(res.message);
      }
    });
  }

  getCartTotal() {
    this.cartPorductData = this.cartList[0].products;
    for (let i = 0; i < this.cartPorductData.length; i++) {
      this.cartCount = this.cartPorductData.length;
      this.customService.setCartCount(this.cartCount);
    }
    for (let i = 0; i < this.cartPorductData.length; i++) {
      this.isShowCartItem = true;
      this.totalAmount = this.cartPorductData.reduce((acc: any, item: any) => {
        return acc += item.totalProductPrice * item.quantity;
      }, 0);
    }
  }

  handleMinus(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.getCartTotal();
      this.updateQuanity(item.productId._id, item.quantity);
    } else {
      this.customService.openSnackBar("Cart quanity min 1");
    }
  }

  handlePlus(item: any) {
    if (item.quantity < 10) {
      item.quantity++;
      this.getCartTotal();
      this.updateQuanity(item.productId._id, item.quantity);
    } else {
      this.customService.openSnackBar("Cart quanity max 10");
    }
  }

  updateQuanity(productId: any, quantity: any) {
    const payload = {
      productId: productId,
      quantity: quantity
    }
    this.apiService.doPost('cart/add', payload).subscribe((res: any) => {
      if (res.type = "success") {
        this.getAllCarts();
      } else {
        this.customService.openSnackBar(res.message);
      }
    });
  }

  removecart(productId: any): void {
    const payload = {
      productId: productId
    }
    this.apiService.doPost('cart/remove', payload).subscribe((res: any) => {
      if (res.type = "success") {
        this.isShowCartItem = false;
        this.customService.openSnackBar(res.message);
        this.getAllCarts();
      } else {
        this.customService.openSnackBar(res.message);
      }
    });
  }

  checkout(): void {
    this.router.navigate(['/user/shopping-cart/checkout']);
  }

}

