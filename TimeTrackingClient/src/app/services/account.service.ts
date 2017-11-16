import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AccountService {

  updateRessourcesList:Subject<boolean> = new Subject<boolean>();
  assignedRessources:Subject<boolean> = new Subject<boolean>();

  headers = new Headers(
    {'Accept': 'application/json'})

  constructor(private http: Http, private authService: AuthService) { }


  getComPanyRessources() {
    return this.http.get('http://localhost:3000/api/companies/'+this.authService.getCurrentUser().id+'/ressources?access_token='+this.authService.getToken(),{ headers: this.headers})
      .map( res => res.json() )
      .catch( error => Observable.throw(error))
  }

  CreateCompanyRessource(ressource) {
    return this.http.post('http://localhost:3000/api/companies/'+this.authService.getCurrentUser().id+'/ressources?access_token='+this.authService.getToken(),ressource,{ headers: this.headers} )
      .map( res => res.json() )
      .catch( error => Observable.throw(error))
  }

  AssignRessources(projectId,ressourcesIds) {
    return this.http.put('http://localhost:3000/api/companies/'+this.authService.getCurrentUser().id+'/projects/'+projectId+'?access_token='+this.authService.getToken(),{"ressources": ressourcesIds},{ headers: this.headers})
      .map( res => res.json() )
      .catch( error => Observable.throw(error))
  }

  AssignProjectRessources(ressourcesIds){
    for (let id of ressourcesIds ) {
      this.http.post('http://localhost:3000/api/ressources/'+id+'/ressourceProjects?access_token='+this.authService.getToken(),{},{ headers: this.headers})
        .map( res => res.json() )
        .catch( error => Observable.throw(error))
        .subscribe( res => console.log(res), err => console.log(err))
    }
  }




}
