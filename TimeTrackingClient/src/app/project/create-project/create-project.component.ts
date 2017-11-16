import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MdDialog} from "@angular/material";
import {ToastrService} from "toastr-ng2";
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  currentUser: any;
  projectForm : FormGroup;

  @ViewChild('picker') picker: any;
  @ViewChild('picker1') picker1: any;


  status = [
    {value: 'In progress', viewValue: 'In progress'},
    {value: 'Suspended', viewValue: 'Suspended'},
    {value: 'Abandoned', viewValue: 'Abandoned'},
    {value: 'Finished', viewValue: 'Finished'}
  ];




  constructor(private projectService: ProjectService,
              public formBuilder : FormBuilder,
              private toastrService: ToastrService

  ) {



    this.projectForm =    this.formBuilder.group({
      title : ['',Validators.required],
      client : ['',Validators.required],
      payedWH : ['',Validators.required],
      totalBudget : ['',Validators.required],
      description: ['',Validators.required],
      status : ['',Validators.required],
      startDate : ['',Validators.required],
      endDate: ['',Validators.required],

    })


  }


  ngOnInit() {


  }

  onChange1(event) {
    console.log(String(event.value))
    this.projectForm.controls['startDate'].setValue(String(event.value));
  }
  onChange2(event) {
    console.log(String(event.value))
    this.projectForm.controls['endDate'].setValue(String(event.value));
  }






  onCreateProject (project) {


    console.log(project)

    this.projectService.createProject(project).subscribe(
      res =>{
        this.projectService.updateProjectsList.next();
        this.toastrService.success('Success  ', 'Project Created  ');
        console.log(res);


      },
      error =>
      {

        console.log(error);
        this.toastrService.warning('make sure project does not exist','Project Not Created');
      }


    )




  }







}
