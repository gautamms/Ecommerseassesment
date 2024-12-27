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
import { RegionService } from './region.service';
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
  publicKey: string = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr7o/DalwL4QSwci4feBK
32Ggap0rTK8KEvFFAY5J3rUSp28b5yZT4Rtd2cNf7dQIANMb/E01UbIEt+DY+F+h
vhh5+aFNDOpUvUy8/tM9Xg22s2UI8mDmmDL7IOGfSIV1Znr+G+D4yu7ThbpoyWa4
ZYW0e+MSu1W4GijBDJcNTOVQndGG3CTKL37KPQgMmZh3Qe/uE/236Sz4U95JMrrD
fyqfbsGS8eIe5+yWS2oX0LdUFuMoNQVuNTN5DlmsLUVYVAgy+H9wCBNWYY6KNYOp
kMG4EwwDqvXIrPZJdM8PFJh4cxFBM1jQE16ot9SipeRuMDv1zDrI6ZIzrIinV7+E
kwIDAQAB
-----END PUBLIC KEY-----`;
  timeZones: any[];
  menuItems = [
    {
      "title": "Leads",
      "isdisable": false,
      "url": "/leads",
      "src": "../assets/images/Leads-1.svg",
      "isSelected": true
    },
    {
      "title": "RFQ",
      "isdisable": false,
      "url": "/rfq",
      "src": "../assets/images/RFQ-1.svg",
      "isSelected": true
    },

    {
      "title": "PO",
      "isdisable": false,
      "url": "/po-customer",
      "src": "../assets/images/PO-1.svg",
      "isSelected": false
    },
    {
      "title": "Catalogue",
      "isdisable": false,
      "url": "/dashboard",
      "src": "../assets/images/Catalog.svg",
      "isSelected": false
    },
    {
      "title": "Customers",
      "isdisable": false,
      "url": "/dashboard",
      "src": "../assets/images/customers.svg",
      "isSelected": false
    },
    {
      "title": "Communications",
      "isdisable": false,
      "url": "",
      "src": "../assets/images/Communications.svg",
      "isSelected": false
    },

    {
      "title": "Calendar",
      "isdisable": false,
      "url": "",
      "src": "../assets/images/Calendar.svg",
      "isSelected": false
    },
    {
      "title": "Parts",
      "isdisable": false,
      "url": "sendmail",
      "src": "../assets/images/Parts-1.svg",
      "isSelected": false
    },
    {
      "title": "Settings",
      "isdisable": false,
      "url": "",
      "src": "../assets/images/settings.svg",
      "isSelected": false
    },
    {
      "title": "Home",
      "isdisable": false,
      "url": "/dashboard",
      "src": "../assets/images/Home.svg",
      "isSelected": true
    },

    {
      "title": "Tracking",
      "isdisable": false,
      "url": "",
      "src": "../assets/images/Tracking.svg",
      "isSelected": false
    },
    {
      "title": "Analytics",
      "isdisable": false,
      "url": "",
      "src": "../assets/images/Analytics.svg",
      "isSelected": false

    },
    {
      "title": "Packing List",
      "isdisable": false,
      "src": "../assets/images/Packing-list.svg",
      "isSelected": false,
    }
  ];

  constructor(private sessionService: UserSessionService, private dataService: DataService,
    public translate: TranslateService, private http: HttpClient, private route: Router, private regionService: RegionService) {
    this.getTimeZones();
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
      });

    const timeZone = this.getBrowserTimeZone();

    var rsa = forge.pki.publicKeyFromPem(this.publicKey);
    var encryptedPassword = window.btoa(rsa.encrypt(password));

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