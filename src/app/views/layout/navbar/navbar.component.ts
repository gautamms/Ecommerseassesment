import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ObservableService } from 'src/app/services/observable.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  username: any;
  emailId: any;
  profileImagePath: any;
  cartCount =0;
  constructor(private route: Router,
    private authService: AuthenticationService,
    private userSessionService: UserSessionService,
    private registrationService: RegistrationService,
    private observableService: ObservableService
  ) {
   
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

 
}
