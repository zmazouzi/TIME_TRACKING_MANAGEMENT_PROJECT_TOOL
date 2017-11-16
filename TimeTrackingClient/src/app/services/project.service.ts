import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ProjectService {

  updateProjectsList:Subject<boolean> = new Subject<boolean>();

  headers = new Headers(
    {'Accept': 'application/json'})


  constructor(private http: Http,
              private authService: AuthService) {
  }



  getProjects() {
    return this.http.get('http://localhost:3000/api/companies/'+this.authService.getCurrentUser().id+'/projects?access_token='+this.authService.getToken(),{headers: this.headers})
      .map(res => res.json())
      .catch(error => Observable.throw(error))
  }


  createProject(project) {

    return this.http.post('http://localhost:3000/api/companies/'+this.authService.getCurrentUser().id+'/projects?access_token='+this.authService.getToken(),project,{headers: this.headers})
      .map(res => res.json())
      .catch(error => Observable.throw(error))
  }

}
