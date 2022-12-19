import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubcategoriesListComponent } from './subcategories-list/subcategories-list.component';

const routes: Routes = [
  {
    path: '',
    component: SubcategoriesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcategoriesRoutingModule { }
