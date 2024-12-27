import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from "@angular/common";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { RegionService } from 'src/app/services/region.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public web = environment.website;

  constructor(
    private authService: AuthenticationService,
    private sessionService: UserSessionService,
    private router: Router,
    private _location: Location,
    private regionService: RegionService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedin') === 'true';

    if (isLoggedIn) {
      // If logged in, allow navigation
      return true;
    } else {
      // Save the current URL for redirect after login
      localStorage.setItem('redirectUrl', state.url);

      // Log the user out and navigate to the login page
      this.authService.logOut();
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

}
