import { Component, OnInit } from '@angular/core';
import {GridOptions} from "ag-grid";
import {ProjectService} from "../../services/project.service";
import {MdDialog} from "@angular/material";
import {DialogComponent} from "../../dialog/dialog.component";

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent {

  private gridOptions: GridOptions;
  listProjects: any[] ;
  constructor(private projectService: ProjectService,
              private dialog: MdDialog
  )
  {

    // close dialog on success

    this.projectService.updateProjectsList.subscribe(
      res => {
        this.dialog.closeAll();
      }
    )


    // get the list of projects
    this.projectService.getProjects().subscribe(res =>
      {
        this.listProjects = res ;
        console.log(this.listProjects)
      }

      , error => console.log(error))

    // update list of projects

    this.projectService.updateProjectsList.subscribe(
      res => {

        // get updated  the list of projects
        this.projectService.getProjects().subscribe(res =>
          {
            this.listProjects = res ;
            console.log(this.listProjects)

            this.updateRowData()
          }

          , error => console.log(error))

      }

    )





    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {
        headerName: "title",
        field: "title",
        width: 100
      },
      {
        headerName: "client",
        field: "client",
        width: 100
      },{
        headerName: "payedWH",
        field: "payedWH",
        width: 100
      },{
        headerName: "totalBudget",
        field: "totalBudget",
        width: 100
      },{
        headerName: "status",
        field: "status",
        width: 100
      },{
        headerName: "startDate",
        field: "startDate",
        width: 100
      },{
        headerName: "startDate",
        field: "endDate",
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

      this.fillGrid(this.listProjects)
    )
    this.gridOptions.api.sizeColumnsToFit()
  }


  fillGrid(projects) {
    let rowData: any[] = [];

    for (let project of projects) {
      rowData.push(
        {title: project.title,
          client: project.client,
          payedWH: project.payedWH,
          totalBudget: project.totalBudget,
          status: project.status,
          startDate: project.startDate,
          endDate : project.endDate
        }

      )

    }
    return rowData;
  }



   openDialog() {
    this.dialog.open(DialogComponent, {
      height: '600px',
      width: '400px',
    });
   }







}


