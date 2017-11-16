import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../services/project.service";

@Component({
  selector: 'app-dialog',
  template: `    
    <md-dialog-content class="accent-color">
      
      <app-create-project></app-create-project>
      
    </md-dialog-content>
    <md-dialog-actions>
      
    </md-dialog-actions>
  `,
  styles: []
})
export class DialogComponent implements OnInit {

  constructor(private projectService: ProjectService) {


  }

  ngOnInit() {
  }

}
