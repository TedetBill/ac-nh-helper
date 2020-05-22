import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { promise } from 'protractor';
import { resolve } from 'url';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private authService: AuthService,
    private router: Router) { }

  dayTrad = ['10', '11', '20', '21', '30', '31', '40', '41', '50', '51', '60', '61'];

  users: User[] = [];
  me: User;
  usersKeys: string[];
  usersSubject = new Subject<User[]>();
  userSubject = new Subject<User>();

  emitUsers() {
    this.usersSubject.next(this.users);
  }
  emitMe() {
    this.userSubject.next(this.me);
  }

  getDays() {
    let day = new Date().getDay();
    let hours = new Date().getHours();
    let sum;
    if (hours < 12) {
      let midDay = '0';
      sum = day + midDay;
    } else {
      let midDay = '1';
      sum = day + midDay
    }
    let match = this.dayTrad.indexOf(sum);
    return match;
  }

  getUsers() {
    return new Promise(
      (resolve) => {
        firebase.database().ref('/users')
          .on('value', (data) => {
            this.users = data.val() ? data.val() : [];
            this.usersKeys = Object.keys(this.users);
            this.emitUsers();
            resolve(this.users);
          }
          );
      }
    )

  }

  getMyUser() {
    let uid = this.authService.getUserUid();
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users/' + uid)
          .once('value',
            (data) => {
              this.me = data.val() ? data.val() : [];
                this.emitMe();
                resolve(this.me);
            },
            (error) => {
              reject(error);
            }
          );
      })
  }


  getSingleUser(name: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users/' + name).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  saveData(datas: number[], sunday: number) {
    let uid = this.authService.getUserUid();
    firebase.database().ref('users/' + uid + '/data').set(datas);
    firebase.database().ref('users/' + uid + '/sunday').set(sunday);
    this.emitMe();
  }

  deleteAccount(uid: string) {
    firebase.database().ref('users/' + uid).remove();
  }

}
