import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ProductService } from 'src/app/services/product.service';
import { UserSessionService } from 'src/app/services/usersession.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: number;
  product: any;
  quantity: number = 1;
  id: number;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private navigation: NavigationService,
    private router: Router,
    private usersession: UserSessionService,
    private alertservice: AlertService,
    private common: CommonService) {
    route.params.subscribe(res => {
      this.productId = res['id'];

    })
    this.id = this.usersession.userId();

  }
  ngOnInit() {
    this.getProductById();
  }

  getProductById() {
    this.productService.getProductbyId(this.productId).subscribe(res => {
      this.product = res
    })
  }

  onImageError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = '/assets/images/category.svg'; 
  }

  gotoProducts() {
    this.navigation.gotoProducts(this.product.
      category
    )
  }

  increaseQuantity() {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    const cartData = {
      userId: this.id,
      date: new Date().toISOString().split('T')[0],
      products: [
        {
          productId: this.product.id,
          quantity: this.quantity
        }
      ]
    };
    this.productService.addCart(cartData).subscribe(res => {
      this.common.sendUpdate(cartData.products)
      this.alertservice.success('Product added to cart successfully!');
      this.navigation.gotoProducts(this.product.
        category)
    },
      (error) => {
        this.alertservice.error('Failed to add product to cart!');
      }
    );
  }

}
