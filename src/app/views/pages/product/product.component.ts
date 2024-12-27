import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';
import { RegionService } from 'src/app/services/region.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  category: string;
  products: any = [];
  selectedQuantity: any;
  constructor(private route: ActivatedRoute,
    private regionService: RegionService,
    private router: Router,
    private navigation:NavigationService
  
  ) {
    route.params.subscribe(res => {
      this.category = res['category'];

    })
  }
  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.regionService.getCategoriesbyName(this.category).subscribe(res => {
      this.products = res;
    })
  }

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/sample-image.jpg'; // Path to your sample image
  }

  toProductDetail(product){
    this.navigation.gotoProductDetail(product.id);
  }

  addToCart(product: any) {
    const cartData = {
      userId: 5, // Replace with dynamic userId
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      products: [
        {
          productId: product.id,
          quantity: this.selectedQuantity
        }
      ]
    };
    this.regionService.addCart(cartData).subscribe(res => {
      console.log('Added to cart:', res);
      alert('Product added to cart successfully!');
    },
      (error) => {
        console.error('Error adding to cart:', error);
        alert('Failed to add product to cart!');
      }
    );
  }
  
}
