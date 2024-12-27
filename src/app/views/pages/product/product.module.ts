import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';


const routes = [
  {
    path: ':category',
    component: ProductComponent
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent
  }
]


@NgModule({
  declarations: [ProductComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProductModule { }
