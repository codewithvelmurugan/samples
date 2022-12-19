import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubcategoriesRoutingModule } from './subcategories-routing.module';
import { SubcategoriesListComponent } from './subcategories-list/subcategories-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubcategoryCreateComponent } from './subcategory-create/subcategory-create.component';


@NgModule({
  declarations: [
    SubcategoriesListComponent,
    SubcategoryCreateComponent
  ],
  imports: [
    CommonModule,
    SubcategoriesRoutingModule,
    SharedModule
  ]
})
export class SubcategoriesModule { }
