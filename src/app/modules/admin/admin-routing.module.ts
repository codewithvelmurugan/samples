import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from 'src/app/core/guards/admin-auth.guard';
import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'categories',
    component: AdminLayoutComponent,
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'subcategories',
    component: AdminLayoutComponent,
    loadChildren: () => import('./subcategories/subcategories.module').then(m => m.SubcategoriesModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'products',
    component: AdminLayoutComponent,
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'coupons',
    component: AdminLayoutComponent,
    loadChildren: () => import('./coupons/coupons.module').then(m => m.CouponsModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'customers',
    component: AdminLayoutComponent,
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'orders',
    component: AdminLayoutComponent,
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
