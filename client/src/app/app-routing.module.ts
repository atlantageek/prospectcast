import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { MatTableModule,MatSidenavModule } from '@angular/material';

import { CategoryComponent } from './category/category.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
//const routes: Routes = [];
const routes: Routes = [
  {
    path: 'products',
    component: ProductComponent,
    data: { title: 'Product List' }
  },
  {
    path: 'categories',
    component: CategoryComponent,
    data: { title: 'Category List' }
  },
  {
    path: 'category/:category_id',
    component: CategoryComponent,
    data: { title: 'Category List' }
  },
  {
    path: 'productdetail/:product_id',
    component: ProductDetailComponent,
    data: { title: 'Category List' }
  },
  { path: '',
    redirectTo: '/categories',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes), MatTableModule, MatSidenavModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
