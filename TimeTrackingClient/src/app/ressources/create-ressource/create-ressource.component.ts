import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "toastr-ng2";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-create-ressource',
  templateUrl: './create-ressource.component.html',
  styleUrls: ['./create-ressource.component.css']
})
export class CreateRessourceComponent implements OnInit {

  ressourceForm : FormGroup;

  @ViewChild('picker1') picker1: any;


  ContractTypes = [
    {value: 'CDI', viewValue: 'CDI'},
    {value: 'CDD', viewValue: 'CDD'},
    {value: 'INTERNSHIP', viewValue: 'INTERNSHIP'},
    {value: 'ANAPEC', viewValue: 'ANAPEC'},
    {value: 'EXTERNAL', viewValue: 'EXTERNAL'}
  ];
  constructor(public formBuilder : FormBuilder,
              private toastrService: ToastrService,
              private accountService: AccountService
  ) {


    this.ressourceForm =    this.formBuilder.group({
      username : ['',Validators.required],
      email : ['',Validators.required],
      HiringDate : ['',Validators.required],
      ContractType : ['',Validators.required],
      WHPerMonth: ['',Validators.required],
      CostPH : ['',Validators.required],
      salary : ['',Validators.required],
      password: ['',Validators.required],

    })

  }

  ngOnInit() {
  }

  onChange1(event) {
    console.log(String(event.value))
    this.ressourceForm.controls['HiringDate'].setValue(String(event.value));
  }


  onCreateRessource (ressource) {


    console.log(ressource)

    this.accountService.CreateCompanyRessource(ressource).subscribe(
      res =>{
        this.accountService.updateRessourcesList.next();
        this.toastrService.success('Email Notification Sent  ', 'Ressource Created  ');
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
