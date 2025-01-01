import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private dataService: DataService
  ) { }

  getProducts() {
    return this.dataService.getRecord('/products');
  }

  getAllCategories() {
    return this.dataService.getRecord('/products/categories');
  }

  getCategoriesbyName(categorie) {
    return this.dataService.getRecord(`/products/category/${categorie}`);
  }

  addCart(data) {
    return this.dataService.post('/carts', data);
  }

  getProductbyId(id) {
    return this.dataService.getRecord(`/products/${id}`);
  }
  getUserCart(id) {
    return this.dataService.getRecord(`/carts/user/${id}`);
  }

  getProfile(id) {
    return this.dataService.getRecord(`/users/${id}`)
  }

}
