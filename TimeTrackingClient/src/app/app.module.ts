import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import 'hammerjs';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AssignmentComponent } from './assignment/assignment.component';
import { ProjectsListComponent } from './project/projects-list/projects-list.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import {
  MdAutocompleteModule,
  MdButtonModule, MdCardModule, MdCheckboxModule, MdChipsModule, MdDatepickerModule, MdGridListModule, MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule, MdProgressBarModule, MdSelectModule,
  MdSidenavModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule, MdTooltipModule
} from "@angular/material";
import { ResourcesListComponent } from './ressources/resources-list/resources-list.component';
import { CreateRessourceComponent } from './ressources/create-ressource/create-ressource.component';
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AuthService} from "./services/auth.service";
import {ToastrModule} from "toastr-ng2";
import { DialogComponent } from './dialog/dialog.component';
import {AgGridModule} from "ag-grid-angular";
import { RedComponent } from './table-fields/red/red.component';
import {ProjectService} from "./services/project.service";
import {AccountService} from "./services/account.service";
import { CreateRessourceDialogComponent } from './dialog/create-ressource-dialog/create-ressource-dialog.component';
import { AssignRessourcesDialogComponent } from './dialog/assign-ressources-dialog/assign-ressources-dialog.component';


const  appRoutes =  [

  { path : 'Project' ,
    component : ProjectsListComponent

  },
  { path : 'Ressource' ,
    component : ResourcesListComponent

  },
  { path : 'Assignment' ,
    component : AssignmentComponent

  },
  { path : 'login' ,
    component : LoginComponent

  },
  { path : 'Register' ,
    component : RegisterComponent

  }
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AssignmentComponent,
    ProjectsListComponent,
    CreateProjectComponent,
    ResourcesListComponent,
    CreateRessourceComponent,
    DialogComponent,
    RedComponent,
    CreateRessourceDialogComponent,
    AssignRessourcesDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(), // ToastrModule added
    AgGridModule.withComponents([RedComponent]),
    FlexLayoutModule,
    MdToolbarModule,
    MdButtonModule,
    MdSidenavModule,
    MdListModule,
    MdCardModule,
    MdGridListModule,
    MdSnackBarModule,
    MdInputModule,
    MdTabsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdMenuModule,
    MdProgressBarModule,
    MdSelectModule,
    MdIconModule,
    MdChipsModule,
    MdAutocompleteModule,
    MdTooltipModule,
    MdCheckboxModule
  ],
  entryComponents: [
    DialogComponent,
    CreateRessourceDialogComponent,
    AssignRessourcesDialogComponent
  ],
  providers: [AuthService,ProjectService,AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
