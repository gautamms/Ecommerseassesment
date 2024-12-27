import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionService } from 'src/app/services/region.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: number;
  product: any;
  constructor(private route: ActivatedRoute,
    private regionService: RegionService,
    private router: Router,) {
    route.params.subscribe(res => {
      this.productId = res['id'];

    })
  }
  ngOnInit(): void {
    this.getProductById();
  }

  getProductById() {
    this.regionService.getProductbyId(this.productId).subscribe(res => {
      this.product = res
    })
  }

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    // element.src = 'assets/sample-image.jpg'; // Provide a fallback image path
  }

}
