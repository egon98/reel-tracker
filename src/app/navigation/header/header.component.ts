import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  socialUser: any;
  authSub: Subscription = new Subscription();

  constructor(public authService: AuthService, public socialAuthService: SocialAuthService) {}

  ngOnInit() {
    this.authSub = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  logout() {
    this.authService.LogOut();
    //this.socialAuthService.signOut();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
