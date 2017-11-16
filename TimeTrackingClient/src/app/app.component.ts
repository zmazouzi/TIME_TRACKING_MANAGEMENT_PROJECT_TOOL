import {Component, ViewChild} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('start') sidenav: any;

    constructor(private authService: AuthService,
                private router: Router
    ) {

      this.authService.companyLoggedIn.subscribe( res =>

        {
          this.sidenav.open();

        },
        error => console.log(error)
      )





    }






  onLogOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
    // this.currentUser = "";
    this.sidenav.close();
  }


  isLoggedIn() {
    if (this.authService.getCurrentUser()) {
      return true
    }
    else {
      return false
    }
  }
}
