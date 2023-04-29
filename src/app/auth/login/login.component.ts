import {Component, NgZone, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  user:any;
  loggedIn:any;
  constructor(public authService: AuthService, private ngZone: NgZone, private router: Router, private socialAuthService: SocialAuthService) {}

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
      if(this.loggedIn) {
        this.ngZone.run(() => this.router.navigate(['/home']))
      }
    })
  }


}
