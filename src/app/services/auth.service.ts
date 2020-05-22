import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
    constructor(private router: Router) { }

    getUserUid() {
        const userConnected = firebase.auth().currentUser;
        if (userConnected != null) {
            const uid = userConnected.uid;
            return uid;

        }
    }

    createNewUser(email: string, password: string) {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().createUserWithEmailAndPassword(email, password).then(
                    () => {
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    signInUser(email: string, password: string) {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().signInWithEmailAndPassword(email, password).then(
                    () => {
                        resolve();
                        location.reload();
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    signOutUser() {
        firebase.auth().signOut();
    }

    deleteAccount() {
        const user = firebase.auth().currentUser;
        user.delete().then(function () {
            location.reload();
        }).catch(function (error) {
            // An error happened.
        });
    }
}
