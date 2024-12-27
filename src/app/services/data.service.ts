import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators'

@Injectable()
export class DataService {

  private baseUrl = environment.apiBaseUrl;
  private cache: any = {};
  getEventRoute = '/api/user/';

  constructor(private http: HttpClient, private httpBackend: HttpBackend, private httpClient: HttpClient) {
    this.httpClient = new HttpClient(httpBackend)
  }

  getData(route: any, refresh: any) {
    if (this.dataForRouteIsCached(route, refresh)) {
      return new Observable(observer => {
        observer.next(this.cache[route])
      })
    } else { // no cached data or refresh requested
      return this.http.get<any>(this.baseUrl + route).pipe(map(response => {
        this.cache[route] = response;
        return response;
      }));
    }
  }

  postWithoutInterceptor(route: any) {

  }

  getDataWithParams(route: any, params: any, refresh: any) {
    if (this.dataForRouteIsCached(route, refresh)) {
      return new Observable(observer => {
        observer.next(this.cache[route])
      })
    } else { // no cached data or refresh requested
      return this.http.get<any>(this.baseUrl + route, { params: params }).pipe(map(response => {
        this.cache[route] = response;
        return response;
      }));
    }
  }

  getRecord(route: any) {
    return this.http.get<any>(this.baseUrl + route);
  }

  getRecordWithParams(route: any, params: any) {
    return this.http.get<any>(this.baseUrl + route, { params: params });
  }

  post(route: any, data: any) {
    return this.http.post<any>(this.baseUrl + route, data);
  }

  delete(route: any) {
    return this.http.delete(this.baseUrl + route).pipe(map(response => {
      return response;
    }));
  }

  getReport(route: any) {
    return this.http.get(this.baseUrl + route, { responseType: 'blob' });
  }

  getExternalData(route: any) {
    return this.http.get<any>(route).pipe(map(response => {
      return response;
    }));
  }

  dataForRouteIsCached(route: any, refresh: any) {
    return this.cache[route] && (refresh === false || refresh === undefined);
  }

  clearCache() {
    this.cache = {};
  }

  clearRouteCache(route: any) {
    this.cache[route] = null;
  }

  postAPI(route: string, payload) {
    return this.http.post<any>(this.baseUrl + route, payload);
  }

  studentAadharVerification(payload) {
    return this.http.post<any>(this.baseUrl + "/api/student/updateaadhaarverificationstatus", payload)
  }

  getList(id: any, date: any) {
    return this.getData("/api/category/" + id + '/' + date, true);
  }

  getCategoryList() {
    return this.getData("/api/category/tickettype", true);
  }

  savePayment(data: any) {
    return this.post("/api/booking/save", data);
  }

  verifyOtp(data) {
    return this.post("/api/user/verifyotp", data);

  }
  report(data: any) {
    return this.post("/api/report/ticket", data);
  }

  getTimeSlotDropdown(data: any) {
    return this.post("/api/category/onlineavailablecheck", data);
  }

  getTimeSlot() {
    return this.getData('/api/category/availablecheck', true)
  }

  generateotp(data) {
    return this.post("/api/user/verifymobileno", data);
  }

  getTermsAndCond(id) {
    return this.getData("/api/lookup/quotelist/" + id, true);
  }

  logout(refresh: boolean) {
    return this.postAPI('/api/user/logout', {}).pipe(map(response => {
      this.clearRouteCache(this.getEventRoute);
      return response;
    }));
  }
  getPaymentBookingRefNo(BookingRefNo){
    return this.getData("/api/payment/zeroresponse/" + BookingRefNo, true);
  }

  getEditDetaails(id){
    return this.getData("/api/booking/" + id, true);
  }
}