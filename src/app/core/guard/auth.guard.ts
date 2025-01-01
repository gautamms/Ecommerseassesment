import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from "@angular/common";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserSessionService } from 'src/app/services/usersession.service';

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
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedin') === 'true';

    if (isLoggedIn) {
      if (state.url === '/') {
        this.router.navigate(['/home']);
        return false; 
      }
      return true; 
    } else {
      localStorage.setItem('redirectUrl', state.url);
      this.authService.logOut(); 
      this.router.navigate(['/auth/login']); 
      return false; 
    }
  }

}
