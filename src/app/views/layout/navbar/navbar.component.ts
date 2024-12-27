import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ObservableService } from 'src/app/services/observable.service';
import { RegionService } from 'src/app/services/region.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username: any;
  emailId: any;
  profileImagePath: any;
  cartCount: number; // Example count, replace with dynamic value
  // Example cart items, replace with dynamic cart items
  showCartDetails: boolean = false;
  id: number;
  cartItems: any = [];
  cartdata: any;
  product: any;
  showProfileDropdown = false;
  constructor(private route: Router,
    private authService: AuthenticationService,
    private userSessionService: UserSessionService,
    private observableService: ObservableService,
    private regionService: RegionService,
    private usersession: UserSessionService,

  ) {
    this.id = this.usersession.userId();

  }
  ngOnInit(): void {
    this.getUserCarts();
  }
  onLogout(e) {
    e.preventDefault();
    const title = "Logout Confirmation";
    const txt = "You want to logout?";
    const Yes = "Yes";
    const No = "No";
    swal.fire({
      title,
      text: txt,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: Yes,
      cancelButtonText: No,
    }).then((result) => {
      if (result.value) {
        this.authService.logOut();
      }
    })
  }

  toggleCartDetails(): void {
    this.showCartDetails = !this.showCartDetails;
  }

  toggleProfileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  goToCart(): void {
    console.log('Redirecting to cart...');
    // Navigate to cart page
  }

  getUserCarts() {
    this.regionService.getUserCart(this.id).subscribe(res => {
      this.cartdata = res;
      this.cartCount = res[0].products.length
      if (res[0].products) {
        res[0].products.forEach(product => {
          this.getProductById(product)
        });
      }

    })
  }

  getProductById(item) {
    this.regionService.getProductbyId(item.productId).subscribe(res => {
      res.quantity = item.quantity;
      this.cartItems.push(res)
      console.log(this.cartItems,"productId");
      
    })
  }


}
