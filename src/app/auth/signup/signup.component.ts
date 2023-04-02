import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../auth.service";
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  user: any;
  loggedIn: any;
  maxDate: Date = new Date();
  constructor(public authService: AuthService, private socialAuthService: SocialAuthService, private ngZone: NgZone,private router: Router) {}

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear());

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
