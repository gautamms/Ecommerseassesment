import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { RegionService } from 'src/app/services/region.service';
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
  id: number
  constructor(private route: ActivatedRoute,
    private regionService: RegionService,
    private router: Router,
    private navigation: NavigationService,
    private usersession: UserSessionService,
    private alertservice :AlertService

  ) {
    route.params.subscribe(res => {
      this.category = res['category'];

    })

    this.id = this.usersession.userId();
  }
  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.regionService.getCategoriesbyName(this.category).subscribe(res => {
      res.forEach(i => {
        i.quantity = 1
      })
      this.products = res;

    })
  }

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    // element.src = 'assets/sample-image.jpg'; // Path to your sample image
  }

  toProductDetail(product) {
    this.navigation.gotoProductDetail(product.id);
  }

  addToCart(event,product: any) {
    event.stopPropagation();
    const cartData = {
      userId: this.id, // Replace with dynamic userId
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      products: [
        {
          productId: product.id,
          quantity: this.quantity
        }
      ]
    };
    this.regionService.addCart(cartData).subscribe(res => {
      console.log('Added to cart:', res);
      this.alertservice.success('Product added to cart successfully!');
    },
      (error) => {
        console.error('Error adding to cart:', error);
        this.alertservice.error('Failed to add product to cart!');
      }
    );
  }

  increaseQuantity(event: MouseEvent,product): void {
    event.stopPropagation(); // Prevent click event from propagating to card
    if (product.quantity < 10) {
      product.quantity++;
    }
  }

  decreaseQuantity(event: MouseEvent,product): void {
    event.stopPropagation(); // Prevent click event from propagating to card
    if (product.quantity > 1) {
      product.quantity--;
    }
  }


}
