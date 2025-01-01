import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()

export class NavigationService {
  constructor(private router: Router) {
  }

  goToDashboard() {
    this.router.navigate(['/home']);
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  gotoProductDetail(id) {
    this.router.navigate([`/product/product-detail/${id}`]);
  }

  gotoProducts(category) {
    this.router.navigate([`/product/${category}`]);

  }

  gotoProfile() {
    this.router.navigate(['/profile'])
  }

}


