import { Component, OnInit } from '@angular/core';
import {GridOptions} from "ag-grid";
import {AccountService} from "../../services/account.service";
import {CreateRessourceDialogComponent} from "../../dialog/create-ressource-dialog/create-ressource-dialog.component";
import {MdDialog} from "@angular/material";
import {AssignRessourcesDialogComponent} from "../../dialog/assign-ressources-dialog/assign-ressources-dialog.component";

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.css']
})
export class ResourcesListComponent implements OnInit {
  private gridOptions: GridOptions;
  listRessources: any[] ;
  constructor(private accountService: AccountService,
              private dialog: MdDialog
  ) {


    this.accountService.assignedRessources.subscribe(
      res => { this.dialog.closeAll(), err => console.log(err)}
    )



    // close dialog on success

    this.accountService.updateRessourcesList.subscribe(
      res => {
        this.dialog.closeAll();
        // get updated  the list of ressources
        this.accountService.getComPanyRessources().subscribe(res => {
          this.listRessources = res;
          console.log(this.listRessources)

          this.updateRowData()
        }) }
          , error => console.log(error)
    )



    this.accountService.getComPanyRessources().subscribe(
      res => { this.listRessources = res ;
              console.log("ressources ")
              console.log(res)
      }, error => console.log(error)
    )



    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {
        headerName: "username",
        field: "username",
        width: 100
      },{
        headerName: "email",
        field: "email",
        width: 100
      },
      {
        headerName: "HiringDate",
        field: "HiringDate",
        width: 100
      },{
        headerName: "ContractType",
        field: "ContractType",
        width: 100
      },{
        headerName: "WHPerMonth",
        field: "WHPerMonth",
        width: 100
      },{
        headerName: "CostPH",
        field: "CostPH",
        width: 100
      },{
        headerName: "salary",
        field: "salary",
        width: 100
      },{
        headerName: "isProjectManager",
        field: "isProjectManager",
        width: 100
      }
    ];
    this.gridOptions.rowData = []
  }

  ngOnInit() {
    setTimeout(() => {
      this.updateRowData()
    },1000)
  }

  updateRowData() {

    this.gridOptions.api.setRowData(

      this.fillGrid(this.listRessources)
    )
    this.gridOptions.api.sizeColumnsToFit()
  }


  fillGrid(ressources) {
    let rowData: any[] = [];

    for (let ressource of ressources) {
      rowData.push(
        {username: ressource.username,
         email: ressource.email,
          phone: ressource.phone,
          HiringDate: ressource.HiringDate,
          ContractType: ressource.ContractType,
          WHPerMonth: ressource.WHPerMonth,
          CostPH: ressource.CostPH,
          salary : ressource.salary,
          isProjectManager : ressource.isProjectManager
        }

      )

    }
    return rowData;
  }


  openDialog() {
    this.dialog.open(CreateRessourceDialogComponent, {
      height: '600px',
      width: '400px',
    });
  }

  openDialog1() {
    this.dialog.open(AssignRessourcesDialogComponent, {
      height: '600px',
      width: '380px',
    });
  }



}
