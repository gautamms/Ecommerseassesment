import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ObservableService } from 'src/app/services/observable.service';
import { ProductService } from 'src/app/services/product.service';
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
  user: string;
  constructor(private route: Router,
    private authService: AuthenticationService,
    private userSessionService: UserSessionService,
    private observableService: ObservableService,
    private productService: ProductService,
    private usersession: UserSessionService,
    private common: CommonService,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private navigation: NavigationService,


  ) {
    this.id = this.usersession.userId();
    this.user = this.usersession.userFullName();
    this.getCartData();
  }
  ngOnInit() {
    this.getUserCarts();
  }

  getCartData() {
    this.common.getUpdate().subscribe(cart => {
      this.cartCount += cart.length
      if (cart) {
        cart.forEach(product => {
          this.getProductById(product)
        });
      }
    })
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

  toProfile() {
    this.navigation.gotoProfile();
  }

  toggleCartDetails(): void {
    this.showCartDetails = !this.showCartDetails;
  }

  toggleProfileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  getUserCarts() {
    this.productService.getUserCart(this.id).subscribe(res => {
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
    this.productService.getProductbyId(item.productId).subscribe(res => {
      res.quantity = item.quantity;
      this.cartItems.push(res)

    })
  }

  initNameIcon = () => {
    if (this.user) {
      const breakName = this.user.split(' ');
      return breakName.length === 1 ? breakName[0].substr(0, 3) : breakName.reduce((acc, curr) => acc + curr.substr(0, 1), '').substr(0, 3);
    }
    return 'U';
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.showProfileDropdown = false;
      this.showCartDetails = false
    }
  }

  onImageError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = '/assets/images/category.svg'; 
  }

}
