import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from 'src/app/core/guards/user-auth.guard';
import { UserLayoutComponent } from 'src/app/layouts/user-layout/user-layout.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    component: UserLayoutComponent,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [UserAuthGuard]
  },
  {
    path: 'products',
    component: UserLayoutComponent,
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    canActivate: [UserAuthGuard]
  },
  {
    path: 'shopping-cart',
    component: UserLayoutComponent,
    loadChildren: () => import('./shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule),
    canActivate: [UserAuthGuard]
  },
  {
    path: 'account',
    component: UserLayoutComponent,
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
    canActivate: [UserAuthGuard]
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
export class UserRoutingModule { }
