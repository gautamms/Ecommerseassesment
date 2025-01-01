import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public web = environment.website
  form: FormGroup;
  showRegistration = false;
  showForgetPassword = false;
  showPassword: boolean;
  studentData: any;
  url: string = '/assets/menu.json';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private alertService: AlertService,
    private dialog: MatDialog,
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.initializeValidators();
  }
  initializeValidators() {
    this.form = this.formBuilder.group({
      Username: ['', [Validators.required,
      ]],
      Password: ['', [Validators.required]]
    });
  }
  validateConsumableFormControl() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\s/g, ''); // Remove all spaces
    this.form.controls['Username'].setValue(input.value); // Update the form control value
  }


  bookTicket() {
    this.router.navigate(['/bookingticket']);
  }

  ticketStatus(type) {
    this.router.navigate(['/ticketstatus']);
  }
  submit() {
    if (this.form.valid) {
      let passwordInfo = {
        // emailId: this.emailId,
        username: this.form.value.Username,
        password: this.form.value.Password,
        isReset: false
      }

      this.authService.login(this.form.value.Username, this.form.value.Password).subscribe((result: any) => {
        localStorage.setItem("interceptData", JSON.stringify(passwordInfo));
        if ('token' in result) {
          this.router.navigate(['/home']);

        }
        else if (result.isFailure) {
          this.alertService.error(result.htmlFormattedFailures);
        }
      });
    } else {
      this.validateConsumableFormControl()
    }
  }
  openRegistration() {
    this.showRegistration = true;
  }
  handleDecline() {
    // Hide registration and show login form
    this.showRegistration = false;
  }

  forgetPassword() {
    this.showForgetPassword = true;
  }

  handleForgetDecline() {
    this.showForgetPassword = false;
  }

  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
