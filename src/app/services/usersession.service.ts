import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class UserSessionService {

  localStorageSessionKey: string;
  filterArr: any[] = [];
  constructor() {
    this.localStorageSessionKey = environment.apiBaseUrl + '-AuthData';
  }

  create(session) {// jshint ignore:line
    this.setLocalStorageProperties(session);
  }

  destroy() {// jshint ignore:line
    localStorage.removeItem('role');
    localStorage.clear();
  }
  authToken() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).authToken;
  }

  load() { // jshint ignore:line
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData;
  }

  username(): string {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).username;
  }

  userFullName(): string {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).userFullName;
  }

  rolename(): string {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).rolename;
  }

  cardId(): string {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).cardId;
  }

  setLocalStorageProperties(session: any) {// jshint ignore:line
    localStorage.setItem(this.localStorageSessionKey, JSON.stringify(session));
  }

  getLocalStorageWithKey(key: any) {// jshint ignore:line
    return localStorage.getItem(key);
  }

  setLocalStorageWithKey(key: any, session: any) {// jshint ignore:line
    localStorage.setItem(key, JSON.stringify(session));
  }

  userId(): any {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    const data = JSON.parse(jsonData);
    return jsonData && data ? data.userId : '';
  }

  roleId(): number {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? 0 : +JSON.parse(jsonData).roleId;
  }

  email(): number {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).email;
  }

  getPageUrl(key: any) {
    this.filterArr = [];
    const menu = JSON.parse(this.getLocalStorageWithKey('menucontrols') as string)
    const filterItems = menu.map((e: any) => {
      e.submenu.forEach((element: any) => {
        this.filterArr.push(element);
      });
    });
    const output = this.filterArr.find(e => {
      return e.path === key;
    })
    // output.edit = true;
    // output.delete = true;
    // output.view = true;
    // output.approve = true;
    // output.copy = true;
    return output.controlAccess;
  }

  

}