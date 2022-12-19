import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponsRoutingModule } from './coupons-routing.module';
import { CouponsListComponent } from './coupons-list/coupons-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CouponCreateComponent } from './coupon-create/coupon-create.component';


@NgModule({
  declarations: [
    CouponsListComponent,
    CouponCreateComponent
  ],
  imports: [
    CommonModule,
    CouponsRoutingModule,
    SharedModule
  ]
})
export class CouponsModule { }
