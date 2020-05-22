import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Injectable()
export class WelcomeService {
    datas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    newU: boolean;
    uid: string;


    constructor(private authService: AuthService, private userService: UsersService, private router: Router) { }

    isNew() {
        this.uid = this.authService.getUserUid();
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/users')// Load only first node of the object (les noms des users)
                    .on('value', (data) => {
                        let datasT = data.val() ? data.val() : [];
                        let usersKeys = Object.keys(datasT);
                        this.newU = usersKeys.includes(this.uid)
                        resolve(this.newU);
                    }, (error) => {
                        reject(error);
                    }
                    );
            }
        )
    }

    creatDataBase(nickName: string, island: string, fruit: string, gender: string) {
        let gates = false;
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('users/' + this.uid + '/nickName').set(nickName);
                firebase.database().ref('users/' + this.uid + '/data').set(this.datas);
                firebase.database().ref('users/' + this.uid + '/historique').set(this.datas);
                firebase.database().ref('users/' + this.uid + '/sunday').set(0);
                firebase.database().ref('users/' + this.uid + '/island').set(island);
                firebase.database().ref('users/' + this.uid + '/fruits').set(fruit);
                firebase.database().ref('users/' + this.uid + '/gender').set(gender);
                firebase.database().ref('users/' + this.uid + '/gates').set(gates);
                
                resolve();
                (error) => {
                    reject(error);
                }
            }
        )

    }

}
