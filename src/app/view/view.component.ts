import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';
//import * as Highcharts from 'highcharts';
import { Subscription } from 'rxjs';
import { WelcomeService } from '../services/welcome.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private userService: UsersService,
    private welcomeService: WelcomeService,
    private router: Router) { }


  @Input() me: User;
  loadOk: boolean;
  isLoading = false;
  wrongPattern = false;
  dataSaved = false;
  userSubscription: Subscription;

  ngOnInit() {
    this.welcomeService.isNew().then(
      (r) => {
        if (!r) {
          this.router.navigate(['welcome']);

        } else {
          this.userSubscription = this.userService.userSubject.subscribe(
            (user: User) => {
              this.me = user;
              this.loadOk = true;
            });
          this.userService.emitMe();
        }
      });
  }

  onSaveData() {
    for (let data of this.me.data) {
      const pattern = new RegExp(/^[0-9]*$/);
      if (data < 0 || data > 500) {
        this.isLoading = true;
        this.wrongPattern = true;
      }
    }
    if (this.wrongPattern) {
      setTimeout(
        () => {
          this.wrongPattern = false;// display errorMessage
          this.isLoading = false;
        }, 2000
      );
    } else {
      if (this.me.sunday == null) {
        this.me.sunday = 0;
      }
      for (let y = 0; y < this.me.data.length; y++) {
        if (this.me.data[y] == null) {
          this.me.data[y] = 0;
        }
      }
      this.userService.saveData(this.me.data, this.me.sunday);
      this.dataSaved = true;
      this.isLoading = true;
      setTimeout(
        () => {
          this.isLoading = false;
          this.dataSaved = false;
        }, 2000
      );
    }
  }
}
