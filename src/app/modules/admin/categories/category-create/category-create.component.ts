import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomService } from 'src/app/core/services/custom.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {

  public categoryForm: any;
  public catergoryImage: any;
  public defaultImage: any = "assets/images/dummy-image-square.jpg";
  public fileUploadData: any;

  public handleError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  }

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private customService: CustomService,
    public dialogRef: MatDialogRef<CategoryCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data && this.data.categoryEditData) {
      this.updateCategoryForm();
    } else {
      this.createCategoryForm();
    }
  }

  createCategoryForm(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]]
    });
  }

  updateCategoryForm(): void {
    this.catergoryImage = this.data.categoryEditData['imageUrl'];
    this.categoryForm = this.formBuilder.group({
      name: [this.data.categoryEditData['name'], [Validators.required]],
      imageUrl: [this.data.categoryEditData['imageUrl'], [Validators.required]]
    });
  }

  onChangeFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      const formData: any = new FormData();
      formData.append('fileUrl', file);
      this.apiService.doUploadPost('file/upload', formData)
        .subscribe((res: any) => {
          if (res.type == "success") {
            this.fileUploadData = res.data;
            this.catergoryImage = this.fileUploadData.fileUrl;
            this.categoryForm.patchValue({
              imageUrl: this.catergoryImage
            });
            this.customService.openSnackBar(res.message);
          } else {
            this.customService.openSnackBar(res.message);
          }
        });
    }
  }

  submitCategoryForm(): void {
    if (this.categoryForm.valid) {
      const payload = {
        name: this.categoryForm.value.name,
        imageUrl: this.categoryForm.value.imageUrl
      }
      if (this.data && this.data.categoryEditData) {
        this.apiService.doPost('categories/update/' + this.data.categoryEditData['slug'], payload)
          .subscribe((res: any) => {
            if (res.type == "success") {
              this.customService.openSnackBar(res.message);
              this.dialogRef.close();
            } else {
              this.customService.openSnackBar(res.message);
            }
          });
      } else {
        this.apiService.doPost('categories/create', payload)
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

