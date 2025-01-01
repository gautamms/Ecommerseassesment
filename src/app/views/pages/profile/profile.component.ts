import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ProductService } from 'src/app/services/product.service';
import { UserSessionService } from 'src/app/services/usersession.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true
})
export class ProfileComponent implements OnInit {
  id: number;
  user: any;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private navigation: NavigationService,
    private usersession: UserSessionService,
    private alertservice: AlertService,) {
    this.id = this.usersession.userId();

  }
  ngOnInit(): void {
    this.getProfile();
  }
  
  getProfile() {
    this.productService.getProfile(this.id).subscribe(res => {
      this.user = res;
        
    })
  }

  gotoHome() {
    this.navigation.goToDashboard();
  }
}
