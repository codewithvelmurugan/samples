import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryCreateComponent } from './category-create/category-create.component';


@NgModule({
  declarations: [
    CategoriesListComponent,
    CategoryCreateComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }
