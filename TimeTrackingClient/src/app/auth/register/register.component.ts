import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "toastr-ng2";
import {MdDialog} from "@angular/material";
import {DialogComponent} from "../../dialog/dialog.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup ;

  constructor(
    public formBuilder : FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    public dialog: MdDialog,

  ) {
    this.registerForm =    this.formBuilder.group({
      companyName: '',
      email : '',
      password : '',
      address : '',
      phoneNumber : ''
    })
  }

  ngOnInit() {
  }


  onRegister(userData) {
    console.log("register fired up ")
    this.router.navigate(['/login']);
    this.toastrService.success("Please verify your email address","Email verification link sent");

    this.authService.register(userData).subscribe( user => {

      console.log(user)



    }, error => console.log(error) );
  }





}
