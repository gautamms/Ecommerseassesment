import { Component, HostListener, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
export let browserRefresh = false;
import { environment } from 'src/environments/environment';
import { UserSession } from './models/usersession';
import { UserSessionService } from './services/usersession.service';
import { DataService } from './services/data.service';
import { Spinkit } from 'ng-http-loader';
import { LoadColorService } from './services/loadercolor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    "(window:click)": "onClick()"
  }
})
export class AppComponent implements OnDestroy {

  lastPing?: Date = null;
  title = 'OSANTS';
  subscription: Subscription;
  routeParams: any;
  spinnerStyle = Spinkit;
  color: string = '#003978';

  constructor(
    public translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private colorService: LoadColorService,
    private dataService: DataService,
    private sessionService: UserSessionService,
  ) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
    this.colorService.changeEmitted$.subscribe(res => {
      this.color = res;
    });
    this.routeParams = route.snapshot.params;
    // this.translate.addLangs(['en', 'ta']);
    // this.translate.setDefaultLang('en');
    // const browserLang = this.translate.getBrowserLang();
    // this.translate.use(browserLang.match(/en|ta/) ? browserLang : 'en');
  }


  ngOnInit(): void {
    if (environment.production) {
      if (location.protocol !== 'https:') {
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
      }
    }
  }

  onClick() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // @HostListener('document:keydown', ['$event'])
  // restrictKeyPress(event: KeyboardEvent): void {
  //   const forbiddenKeys = ['Enter'];
  //   const forbiddenForms = ['login'];
    
  //   // Prevent default action if the key is forbidden
  //   if (event.target instanceof HTMLInputElement &&
  //     event.target.form && forbiddenKeys.includes(event.key) && !forbiddenForms.includes(event.target.form.id)) {
  //     event.preventDefault();
  //   }
  // }

}
