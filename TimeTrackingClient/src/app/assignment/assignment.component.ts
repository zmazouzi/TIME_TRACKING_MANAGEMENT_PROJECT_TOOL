import { Component } from '@angular/core';
import {AccountService} from "../services/account.service";
import {FormControl} from "@angular/forms";
import {ProjectService} from "../services/project.service";
import {ToastrService} from "toastr-ng2";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent {

  listRessources: any[];
  listProjects: any[] ;
  selectedRessourcesIds: string[] = [];
  selectedProjectId: string;
  myControl: FormControl = new FormControl();
  constructor(private accountService: AccountService,
              private projectService: ProjectService,
              private toastrService: ToastrService) {

    //get the list of ressources
    this.accountService.getComPanyRessources().subscribe(
      res => {
        this.listRessources = res;
        console.log("ressources ")
        console.log(res)
      }, error => console.log(error)
    )

    // get the list of projects
    this.projectService.getProjects().subscribe(res =>
    {
      this.listProjects = res ;
      console.log(this.listProjects)
    }, error => console.log(error) )


  }


  onSelectRessource(ressource) {
    // console.log(ressource);
    this.selectedRessourcesIds.push(ressource.id);
    console.log(this.selectedRessourcesIds)
  }


  onSelectProject(event) {
    console.log(event.source.value)
    this.selectedProjectId = event.source.value;
  }


  OnAssignRessorces() {
    this.accountService.AssignRessources(this.selectedProjectId,this.selectedRessourcesIds)
      .subscribe( res => {
        this.accountService.assignedRessources.next()
        this.toastrService.success("Ressources assigned to project","Success");
        var that = this
        setTimeout(function () {
          that.toastrService.info("Email Notification Sent to ressources ","Notification")
        },2000)

        console.log(res)

      }, error => console.log(error))

    this.accountService.AssignProjectRessources(this.selectedRessourcesIds)
  }

  isValid() {
    if(this.selectedRessourcesIds.length >0 && !isNullOrUndefined(this.selectedProjectId)){
      return false
    }
    else {
      return true
    }
  }
}
