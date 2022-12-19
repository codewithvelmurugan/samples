import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  private cartCount = new BehaviorSubject<any>('');
  cartItem = this.cartCount.asObservable();

  constructor(
    private matSnackBar: MatSnackBar,
  ) { }

  openSnackBar(message: string) {
    this.matSnackBar.open(message, '', {
      duration: 1000,
      verticalPosition: 'bottom'
    });
  }

  setCartCount(newCount: any) {
    this.cartCount.next(newCount);
  }
}
