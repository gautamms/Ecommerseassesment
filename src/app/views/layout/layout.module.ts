import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxCountriesDropdownModule } from 'ngx-countries-dropdown';
import { BaseComponent } from './base/base.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

@NgModule({
  declarations: [
    BaseComponent,
    FooterComponent,
    DashboardComponent,
    NavbarComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule,
    MatStepperModule,
    NgxCountriesDropdownModule,
    LayoutRoutingModule,
    NgbDropdownModule,
    NgApexchartsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],

})
export class LayoutModule { }
