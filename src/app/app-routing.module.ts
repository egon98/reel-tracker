import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./auth/auth.guard";
import {WelcomeComponent} from "./welcome/welcome.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {LoginComponent} from "./auth/login/login.component";
import {HomeComponent} from "./home/home.component";
import {EmailverificationComponent} from "./emailverification/emailverification.component";
import {PasswordresetComponent} from "./passwordreset/passwordreset.component";
import {ProfileComponent} from "./profile/profile.component";
import {DataListComponent} from "./data-list/data-list.component";
import {StatisticsComponent} from "./statistics/statistics.component";

const routes: Routes = [
  {path: '', component:WelcomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'login', component:LoginComponent},
  {path: 'emailverification', component: EmailverificationComponent},
  {path: 'passwordreset', component: PasswordresetComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'data-list', component: DataListComponent},
  {path: 'statistics', component: StatisticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
