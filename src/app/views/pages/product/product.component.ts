import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ProductService } from 'src/app/services/product.service';
import { UserSessionService } from 'src/app/services/usersession.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  category: string;
  products: any = [];
  selectedQuantity: any;
  quantity: number = 1;
  id: number;
  searchQuery: string = '';
  filteredItems: any[];

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private navigation: NavigationService,
    private usersession: UserSessionService,
    private alertservice: AlertService,
    private common: CommonService

  ) {
    route.params.subscribe(res => {
      this.category = res['category'];

    })

    this.id = this.usersession.userId();
  }
  ngOnInit() {
    this.getProducts()
  }

  getProducts() {
    this.productService.getCategoriesbyName(this.category).subscribe(res => {
      res.forEach(i => {
        i.quantity = 1;
      });
      this.products = res;
      this.filteredItems = [...this.products];
    });
  }

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
     element.src = '/assets/images/category.svg'; 
  }

  toProductDetail(product) {
    this.navigation.gotoProductDetail(product.id);
  }

  addToCart(event, product: any) {
    event.stopPropagation();
    const cartData = {
      userId: this.id, 
      date: new Date().toISOString().split('T')[0],
      products: [
        {
          productId: product.id,
          quantity: this.quantity
        }
      ]
    };
    this.productService.addCart(cartData).subscribe(res => {
      this.common.sendUpdate(cartData.products)
      this.alertservice.success('Product added to cart successfully!');
    },
      (error) => {
        this.alertservice.error('Failed to add product to cart!');
      }
    );
  }

  increaseQuantity(event: MouseEvent, product): void {
    event.stopPropagation(); // Prevent click event from propagating to card
    if (product.quantity < 10) {
      product.quantity++;
    }
  }

  decreaseQuantity(event: MouseEvent, product): void {
    event.stopPropagation(); // Prevent click event from propagating to card
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  gotoHome() {
    this.navigation.goToDashboard();
  }

  onSearchChange() {
    const query = this.searchQuery.trim().toLowerCase();
    if (query === '') {
      this.filteredItems = [...this.products];
    } else {
      this.filteredItems = this.products.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }
  }
}
