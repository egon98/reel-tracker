import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./auth/auth.guard";
import {WelcomeComponent} from "./welcome/welcome.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {LoginComponent} from "./auth/login/login.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: '', component:WelcomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
