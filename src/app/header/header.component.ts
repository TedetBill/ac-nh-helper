import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { Subscription, interval } from 'rxjs';
import { Router } from '@angular/router';
import { SettingService } from '../services/setting.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
    private userService: UsersService,
    private settingService: SettingService,
    private router: Router) { }

  isAuth: boolean;
  userSubscription: Subscription;
  loadOk: boolean;
  newUser: boolean;
  me: User;
  counter$;
  counterSubscription: Subscription;
  secondes: number;

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
          if (this.userService.usersKeys.indexOf(this.authService.getUserUid()) == -1) {
            this.newUser = true;
          } else {
            this.userSubscription = this.userService.userSubject.subscribe(
              (user: User) => {
                this.me = user;
                this.newUser = false;
                this.loadOk = true;
              });
            this.userService.emitMe();
            this.counter$ = interval(1000);
            this.counterSubscription = this.counter$.subscribe();
          }

        } else {
          this.isAuth = false;
        }
      })
  }
  onSignOut() {
    this.settingService.closeGate(this.authService.getUserUid());
    this.authService.signOutUser();
    this.secondes = 0;
    this.counterSubscription.unsubscribe();
    location.reload();
  }
  onReset(){
    this.counter$ = 0;
    this.counterSubscription.unsubscribe();
    this.counter$ = interval(1000);
    this.counterSubscription = this.counter$.subscribe(
      (value)=>{
        this.secondes = value;
        if(this.secondes == 600){
          this.onSignOut();
        }
      }
    )
  }
}
