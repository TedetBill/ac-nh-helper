import { Component, OnInit, Input } from '@angular/core';
import { SettingService } from '../services/setting.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WelcomeService } from '../services/welcome.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(private settingService: SettingService,
    private userService: UsersService,
    private router: Router,
    private authService: AuthService,
    private welcomeService: WelcomeService) { }

  @Input() me: User;
  nickNameOk: boolean;
  loadOk: boolean;
  uid: string;
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
              this.uid = this.authService.getUserUid();
              this.loadOk = true;
            });
          this.userService.emitMe();
        }
      }
    );
  }

  onChangeNickName() {
    this.settingService.changeNickName(this.me.nickName, this.uid);
    this.nickNameOk = true;
    setTimeout(
      () => {
        this.nickNameOk = false;
      }, 2000
    );
  }
  onSunday() {
    this.settingService.sundayChange(this.uid, this.me);
  }

  onOpenGates() {
    this.settingService.openGates(this.uid);
  }

  onCloseGates() {
    this.settingService.closeGate(this.uid);
  }

  onDeleteAccount() {
    if (confirm('Etes-vous sûr de vouloir supprimer definitivement votre compte ?')) {
      this.userService.deleteAccount(this.uid);
      this.authService.deleteAccount();
    } else {
      return null;
    }
  }

}
