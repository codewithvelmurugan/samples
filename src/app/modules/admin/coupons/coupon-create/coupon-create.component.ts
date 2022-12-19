import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomService } from 'src/app/core/services/custom.service';

@Component({
  selector: 'app-coupon-create',
  templateUrl: './coupon-create.component.html',
  styleUrls: ['./coupon-create.component.scss']
})
export class CouponCreateComponent implements OnInit {

  public couponForm: any;

  public handleError = (controlName: string, errorName: string) => {
    return this.couponForm.controls[controlName].hasError(errorName);
  }

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private customService: CustomService,
    public dialogRef: MatDialogRef<CouponCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.createCouponForm();
  }

  createCouponForm(): void {
    this.couponForm = this.formBuilder.group({
      discount: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]]
    });
  }

  submitCouponForm(): void {
    if (this.couponForm.valid) {
      const payload = {
        discount: this.couponForm.value.discount,
        expiryDate: this.couponForm.value.expiryDate
      }
      this.apiService.doPost('coupon/create', payload)
        .subscribe((res: any) => {
          if (res.type == "success") {
            this.customService.openSnackBar(res.message);
            this.dialogRef.close();
          } else {
            this.customService.openSnackBar(res.message);
          }
        });
    }
  }

}