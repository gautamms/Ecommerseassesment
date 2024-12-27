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
    let menuItems: any[] = [];
    const paths: string[] = [];
    if (localStorage.getItem('isLoggedin') === 'true') {
      if (state.url === '/dashboard') return true;

   
    } else {
      this.authService.logOut();
      this.router.navigate(['/auth/login']);
      return false; // Ensure a value is returned after navigation
    }
    this.authService.logOut();
    this.router.navigate(['/auth/login']);
    return false; // Return a default value
  }
}
