import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

// Third-party Libraries
import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxCountriesDropdownModule } from 'ngx-countries-dropdown';
import { CarouselModule } from 'ngx-owl-carousel-o';

// Application-specific Modules
import { DirectivesModule } from 'src/app/directives/directives.module';

// Components
import { AuthComponent } from './auth.component';
import { LoginComponent } from './Login/login.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

// Routes
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    LoginComponent,AuthComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    NgbDropdownModule,
    NgbCollapseModule,
    DirectivesModule,
    CarouselModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    NgSelectModule,
    NgxCountriesDropdownModule,
    MatTooltipModule,
    NgxMatSelectSearchModule,
  ],
  providers: [AuthenticationService],

})
export class AuthModule {}
