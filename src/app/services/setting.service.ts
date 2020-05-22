import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  constructor(private userService: UsersService) { }
  
  changeNickName(nickName: string, userName: string){
    if(nickName==''){
      nickName = userName;
    }
    firebase.database().ref('/users/' + userName + '/nickName/').set(nickName);
    this.userService.getMyUser();
  }

  openGates(uid:string){
      firebase.database().ref('users/'+ uid +'/gates').set(true).then(
        ()=>{
          this.userService.getMyUser();
        }
      );
  }
  closeGate(uid:string){
    firebase.database().ref('users/'+ uid +'/gates').set(false).then(
      ()=>{
        this.userService.getMyUser();
      }
    );
   
  }
    
  sundayChange(uid:string, user){
        let newDatas = [0,0,0,0,0,0,0,0,0,0,0,0]; 
        firebase.database().ref('users/'+ uid +'/historique').set(user.data);
        firebase.database().ref('users/'+ uid +'/historique/lastSunday').set(user.sunday);
        firebase.database().ref('users/'+ uid +'/data').set(newDatas);
        firebase.database().ref('users/'+ uid +'/sunday').set(0);
        this.userService.emitMe();
    
  }
}


