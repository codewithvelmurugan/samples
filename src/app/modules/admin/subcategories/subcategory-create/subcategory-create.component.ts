import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { CustomService } from 'src/app/core/services/custom.service';

@Component({
  selector: 'app-subcategory-create',
  templateUrl: './subcategory-create.component.html',
  styleUrls: ['./subcategory-create.component.scss']
})
export class SubcategoryCreateComponent implements OnInit {

  public subcategoryForm: any;
  public categoriesList: any;

  public handleError = (controlName: string, errorName: string) => {
    return this.subcategoryForm.controls[controlName].hasError(errorName);
  }

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private customService: CustomService,
    public dialogRef: MatDialogRef<SubcategoryCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data && this.data.subcategoryEditData) {
      this.updateSubcategoryForm();
    } else {
      this.createSubcategoryForm();
    }
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.apiService.doGet('categories/list')
      .subscribe((res: any) => {
        if (res.type == "success") {
          this.categoriesList = res.data;
        } else {
          this.customService.openSnackBar(res.message);
        }
      });
  }

  createSubcategoryForm(): void {
    this.subcategoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      parentId: ['', [Validators.required]]
    });
  }

  updateSubcategoryForm(): void {
    this.subcategoryForm = this.formBuilder.group({
      name: [this.data.subcategoryEditData['name'], [Validators.required]],
      parentId: [this.data.subcategoryEditData['parentId']['_id'], [Validators.required]]
    });
  }

  submitSubcategoryForm(): void {
    if (this.subcategoryForm.valid) {
      const payload = {
        name: this.subcategoryForm.value.name,
        parentId: this.subcategoryForm.value.parentId
      }
      if (this.data && this.data.subcategoryEditData) {
        this.apiService.doPost('subcategories/update/' + this.data.subcategoryEditData['slug'], payload).subscribe((res: any) => {
          if (res.type == "success") {
            this.customService.openSnackBar(res.message);
            this.dialogRef.close();
          } else {
            this.customService.openSnackBar(res.message);
          }
        });
      } else {
        this.apiService.doPost('subcategories/create', payload).subscribe((res: any) => {
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
