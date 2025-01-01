import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserSessionService } from './usersession.service';
import { DataService } from './data.service';
import { UserSession } from '../models/usersession';
import * as jwtDecode from 'jwt-decode';
import * as momenttz from 'moment-timezone';
import swal from "sweetalert2";

declare var require: any;
const timezone = require('src/assets/json/timezones.json');
import { map } from 'rxjs';
import * as forge from 'node-forge';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
//declare var forge: any;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = environment.apiBaseUrl;
  pageAccess = true;
  sessionData = new UserSession();
  tokenFromUI: string = "1e2f3g4c5h7a8x9q";
  tokenFromIV: any;
  timeZones: any[];
 

  constructor(private sessionService: UserSessionService, private dataService: DataService,
    public translate: TranslateService, private http: HttpClient, private route: Router, private productService: ProductService) {
    this.getTimeZones();
  }

  login(username: string, password: string) {
    const data = { username: username, password: password, };
    return this.http.post<any>(this.baseUrl + '/auth/login', data)
      .pipe(map(user => {
        if ('token' in user) {
          const decodedToken = jwtDecode.default<any>(user.token);
          this.sessionData.authToken = user.token;
          this.sessionData.userId = decodedToken['sub'];
          this.sessionData.userFullName = decodedToken['user'];
          this.sessionService.create(this.sessionData);
          this.destroySession();
          localStorage.setItem('token', user.token);
          localStorage.setItem('userId', decodedToken['sub']);
          localStorage.setItem('userFullName', decodedToken['user']);
          localStorage.setItem('isLoggedin', 'true');
        }
        return user;
      }));
  }

  getBrowserTimeZone(): string {
    const zoneName = momenttz.tz.guess();
    const temptimezone = momenttz.tz(zoneName).zoneAbbr();
    const filterZone = this.timeZones.find(i => i.abbr === temptimezone);
    if (filterZone) {
      return filterZone.value;
    }
    return '';
  }


  onLogout() {
    const title = this.translate.instant('LogoutConfirmation');
    const txt = this.translate.instant('Youwanttologout');
    const Yes = this.translate.instant('Yes');
    const No = this.translate.instant('No');
    swal.fire({
      title,
      text: txt,
      icon: 'warning',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: Yes,
      cancelButtonText: No,
    }).then((result) => {
      if (result.value) {
        this.dataService.logout(true).subscribe(res => {
          this.dataService.clearCache();
          this.sessionService.destroy();
        });
      }
    })
  }

  logOut() {
    this.dataService.clearCache();
    this.sessionService.destroy();
    this.route.navigate(['/auth/login'])

  }

  logOutAuth() {
    this.dataService.clearCache();
    this.sessionService.destroy();
    this.route.navigate(['/auth/login'])

  }

  destroySession() {
    this.dataService.clearCache();
    this.sessionService.destroy();
  }

  getTimeZones() {
    this.timeZones = timezone.timeZone;
  }

  isAuthenticated() {
    return !!this.sessionService.userId() && !!this.sessionService.authToken();
  }

}