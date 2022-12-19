import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomService } from 'src/app/core/services/custom.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  public productsForm: any;
  public productImage: any;
  public isproductImage: boolean = true;
  public categoriesList: any;
  public defaultImage: any = "assets/images/dummy-image-square.jpg";
  public fileUploadData: any;

  public handleError = (controlName: string, errorName: string) => {
    return this.productsForm.controls[controlName].hasError(errorName);
  }

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private customService: CustomService,
    public dialogRef: MatDialogRef<ProductCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data && this.data.productEditData) {
      this.updateProductsForm();
    } else {
      this.createProductsForm();
    }
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.apiService.doGet('categories/all')
      .subscribe((res: any) => {
        if (res.type == "success") {
          this.categoriesList = res.data;
        } else {
          this.customService.openSnackBar(res.message);
        }
      });
  }

  createProductsForm(): void {
    this.productsForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      subcategoryId: ['', [Validators.required]],
      price: ['', [Validators.required]],
      priceDiscount: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      sold: ['', [Validators.required]]
    });
  }

  updateProductsForm() {
    this.isproductImage = false;
    this.productImage = this.data.productEditData['imageUrl'];
    this.productsForm = this.formBuilder.group({
      title: [this.data.productEditData['title'], [Validators.required]],
      description: [this.data.productEditData['description'], [Validators.required]],
      imageUrl: [this.data.productEditData['imageUrl'], [Validators.required]],
      subcategoryId: [this.data.productEditData['subcategoryId']['_id'], [Validators.required]],
      price: [this.data.productEditData['price'], [Validators.required]],
      priceDiscount: [this.data.productEditData['priceDiscount'], [Validators.required]],
      quantity: [this.data.productEditData['quantity'], [Validators.required]],
      sold: [this.data.productEditData['sold'], [Validators.required]]
    });
  }

  onChangeFile(event: any): void {
    if (event.target.files) {
      let fileList = event.target.files;
      const formData: any = new FormData();
      for (let file of fileList) {
        formData.append('filesUrl', file)
      }
      this.apiService.doUploadPost('file/uploads', formData)
        .subscribe((res: any) => {
          if (res.type == "success") {
            this.fileUploadData = res.data;
            this.productImage = this.fileUploadData.filesUrl;
            this.isproductImage = false;
            this.productsForm.patchValue({
              imageUrl: this.productImage
            });
            this.customService.openSnackBar(res.message);
          } else {
            this.customService.openSnackBar(res.message);
          }
        });
    }
  }

  submitProductsForm(): void {
    if (this.productsForm.valid) {
      const payload = {
        title: this.productsForm.value.title,
        description: this.productsForm.value.description,
        imageUrl: this.productsForm.value.imageUrl,
        subcategoryId: this.productsForm.value.subcategoryId,
        price: this.productsForm.value.price,
        priceDiscount: this.productsForm.value.priceDiscount,
        quantity: this.productsForm.value.quantity,
        sold: this.productsForm.value.sold
      }
      if (this.data && this.data.productEditData) {
        this.apiService.doPost('products/update/' + this.data.productEditData['slug'], payload)
          .subscribe((res: any) => {
            if (res.type == "success") {
              this.customService.openSnackBar(res.message);
              this.dialogRef.close();
            } else {
              this.customService.openSnackBar(res.message);
            }
          });
      } else {
        this.apiService.doPost('products/create', payload)
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

}
