import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {isNullOrUndefined} from 'util';
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService {

  public companyLoggedIn:Subject<any> = new Subject<any>();

  serverUrl = 'http://localhost:3000' ;

  constructor(private http: Http) { }


  headers = new Headers(
    {'Accept': 'application/json'
    });



  setUser(account) {


    const userString = JSON.stringify(account);
    localStorage.setItem('currentUser', userString);

  }



  getCurrentUser() {

    const userString = localStorage.getItem('currentUser');
    if (!isNullOrUndefined(userString)) {
      const user = JSON.parse(userString);

      return user;
    } else {

      return null;
    }
  }

  setToken(token: string) {

    localStorage.setItem('accessToken', token);
  }

  getToken(): string {

    return localStorage.getItem('accessToken');
  }


  register(userData) {
    return this.http.post(this.serverUrl + '/api/companies?include=user', userData,  {headers: this.headers})
      .map(res => res.json())
      .catch(error => {
        return Observable.throw(error); });
  }

  login(userData) {
    return this.http.post(this.serverUrl + '/api/companies/login?include=user', userData, {headers: this.headers})
      .map(res => res.json())
      .catch( error => Observable.throw(error));
  }

  logout() {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('currentUser');

  }

  



}
