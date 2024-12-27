import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Injectable()
export class AlertService {

  constructor(private toastr: ToastrService,
    private _location: Location) {
    this.toastr.toastrConfig.enableHtml = true;
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.toastr.success(message);
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.toastr.error(message);
  }

  warning(message: string, keepAfterNavigationChange = false) {
    this.toastr.warning(message);
  }

  info(message: string, keepAfterNavigationChange = false) {
    this.toastr.info(message);
  }

  async alert(message: string,) {
    this.toastr.info(message);
  }

  result(result: any, isSuccessGoBack = false, message: string) {
    if (result && result.isSuccess) {
      if (message) {
        this.success(message);
      } else {
        this.success('Requested information updated successfully');
      }
      if (isSuccessGoBack) {
        this._location.back();
      }
    } else {
      if (result && result.failures) {
        this.error(result.failures.toString());
      }
    }
  }

}
