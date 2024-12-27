import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { RegionService } from 'src/app/services/region.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  showPopup = false;
  menuItems: any[] = [];
  userselected: any[] = [];
  pathName: string;
  selected: boolean = false;
  private subscriptionName: Subscription;
  messageReceived: any;
  menudata: any;
  constructor(public router: Router, private regionService: RegionService,
    private Service: CommonService,
    @Inject(DOCUMENT) private document: Document
  ) {

    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {

        if (window.matchMedia('(max-width: 991px)').matches) {
          this.document.body.classList.remove('sidebar-open');
        }

      }
    });

  }

  ngOnInit() {
    this.pathName = window.location.pathname;

  }


  ngAfterViewInit() {
    // new MetisMenu(this.sidebarMenu.nativeElement);

  }


}
