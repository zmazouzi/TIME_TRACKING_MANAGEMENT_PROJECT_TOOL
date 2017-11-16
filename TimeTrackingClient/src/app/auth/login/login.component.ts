import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "toastr-ng2";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastrService: ToastrService


  ) {

    this.loginForm = this.fb.group({
      email : '',
      password : ''
    })
  }

  ngOnInit() {


  }


  onLogin(userData) {

    console.log(userData)
    this.authService.login(userData).subscribe( user => {
      this.toastrService.success("WELCOM "," LOGIN SUCCESS ")
      this.authService.companyLoggedIn.next();
      this.authService.setToken(user.id);
      this.authService.setUser(user.user)


      // redirect to content according to RoleMapping


      this.router.navigate(['/Project'])

      console.log(user)

      // this.toastrService.success('Login success ', 'Welcome ');

      // this.projectService.projectOpen.next();

    } , error => {

      console.log(error);
      this.toastrService.error( 'Email or Password incorrect','login Failed');

    })



  }



}
