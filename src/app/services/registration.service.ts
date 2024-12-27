import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private dataService: DataService) { }

  login(credential) {
    return this.dataService.post('/api/token1', credential);
  }

  saveContactInfo(contactInfo) {
    return this.dataService.post('/api/user', contactInfo);
  }

  checkuserregistration(data) {
    return this.dataService.post('/api/checkuserregistration', data);
  }

  resendEmail(data) {
    return this.dataService.post('/api/resendemail', data);
  }

  isEmailverified(data) {
    return this.dataService.post('/api/isemailverified', data);
  }

  resendOTP(data) {
    return this.dataService.post('/api/resendotp', data);
  }

  verifyMobileNo(otpDetails){
    return this.dataService.post('/api/cellverification', otpDetails);
   }

   saveAddressInfo(addressInfo){
    return this.dataService.post('/api/useraddress', addressInfo);
  }

  saveProfileInfo(profileInfo){
    return this.dataService.post('/api/userprofile', profileInfo);
  }

  forgotPassword(emailId){
    return this.dataService.post('/api/forgotpassword', emailId);
  }

  changePassword(newCredentials){
    return this.dataService.post('/api/changepassword', newCredentials);
   }

   getTerms() {
    return this.dataService.getRecord('/api/termsandcondition');
  }

  getProfileInfo() {
    return this.dataService.getRecord('/api/user/userprofile');
  }
}
