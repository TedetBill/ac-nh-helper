import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { WelcomeService } from '../services/welcome.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private welcomeService: WelcomeService,
    private router: Router,
    private userService: UsersService,
    private authService: AuthService) { }

  loadOk: boolean;
  users: User[];
  usersSubscription: Subscription;
  uid: string;
  me: User;
  usersKeys: string[] = [];
  match: number;

  ngOnInit() {
    this.welcomeService.isNew().then(
      (r) => {
        if (!r) {
          this.router.navigate(['welcome']);

        } else {
          this.usersSubscription = this.userService.usersSubject.subscribe(
            (users: User[]) => {
              this.users = users;
              this.usersKeys = Object.keys(users);
              let uid = this.authService.getUserUid()
              this.me = this.users[uid];
              this.match = this.userService.getDays();
               let myIndexToRemove = this.usersKeys.indexOf(uid);
               this.usersKeys.splice(myIndexToRemove, 1);
              this.loadOk = true;
            });

          this.userService.emitUsers();
        }
      });

  }

  onViewUser(user: string) {
    this.router.navigate(['/users', 'view', user]);
  }

}
