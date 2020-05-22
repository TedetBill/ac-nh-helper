import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { WelcomeService } from './services/welcome.service';
import { SettingsComponent } from './settings/settings.component';
import { SettingService } from './services/setting.service';
import { AuthService } from './services/auth.service';
import { UsersComponent } from './users/users.component';
import { UsersService } from './services/users.service';
import { SingleUserComponent } from './users/single-user/single-user.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuardService } from './services/auth-guard.service';
import { GraphComponent } from './graph/graph.component';
import { GraphUserComponent } from './graph-user/graph-user.component';


const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'cours-du-navet', canActivate: [AuthGuardService], component: ViewComponent },
  { path: 'welcome', canActivate: [AuthGuardService], component: WelcomeComponent },
  { path: 'settings', canActivate: [AuthGuardService], component: SettingsComponent },
  { path: 'users', canActivate: [AuthGuardService], component: UsersComponent },
  { path: 'users/view/:id', canActivate: [AuthGuardService], component: SingleUserComponent },
  { path: '', redirectTo: 'settings', pathMatch: 'full'},
  { path: '**', redirectTo: 'settings'}
];

/* const appRoutes: Routes = [ 
    { path: 'auth/signup', component: SignupComponent },
    { path: 'auth/signin', component: SigninComponent },
    { path: 'cours-du-navet', component: ViewComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'users', component: UsersComponent },
    { path: 'users/view/:id', component: SingleUserComponent },
    { path: '', redirectTo: 'cours-du-navet', pathMatch: 'full'},
    { path: '**', redirectTo: 'cours-du-navet'}
]; */

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    WelcomeComponent,
    HeaderComponent,
    SettingsComponent,
    UsersComponent,
    SingleUserComponent,
    SignupComponent,
    SigninComponent,
    GraphComponent,
    GraphUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    WelcomeService,
    SettingService,
    AuthService,
    AuthGuardService,
    UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
