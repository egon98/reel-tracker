import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {RouterOutlet} from "@angular/router";
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import {AuthService} from "./auth/auth.service";
import {
  GoogleLoginProvider, GoogleSigninButtonModule,
  SocialAuthService,
  SocialAuthServiceConfig,
  SocialLoginModule
} from "@abacritt/angularx-social-login";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FirebaseAppModule} from "@angular/fire/app";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { WelcomeComponent } from './welcome/welcome.component';
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {GoogleMapsModule} from "@angular/google-maps";
import {MDBBootstrapModule} from "angular-bootstrap-md";
import { DialogComponent } from './dialog/dialog.component';
import { EmailverificationComponent } from './emailverification/emailverification.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { ProfileComponent } from './profile/profile.component';
import {A11yModule} from "@angular/cdk/a11y";
import { DataListComponent } from './data-list/data-list.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {MatSortModule} from "@angular/material/sort";
import { DialogOnDeleteRowComponent } from './dialog-on-delete-row/dialog-on-delete-row.component';
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    LoginComponent,
    SignupComponent,
    WelcomeComponent,
    HomeComponent,
    DialogComponent,
    EmailverificationComponent,
    PasswordresetComponent,
    ProfileComponent,
    DataListComponent,
    StatisticsComponent,
    DialogOnDeleteRowComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSidenavModule,
    RouterOutlet,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatTooltipModule,
    MatTabsModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatNativeDateModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    HttpClientModule,
    GoogleMapsModule,
    MDBBootstrapModule.forRoot(),
    A11yModule,
    MatPaginatorModule
  ],
  exports: [
    MatSidenavModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    FirebaseAppModule,
    MatSidenavContainer,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
  ],
  providers: [AuthService, SocialAuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '503062012461-ta5g1fprehpa3p5gea7fo73vca5mhvc1.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
