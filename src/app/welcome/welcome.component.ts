import { Component, OnInit, Input } from '@angular/core';
import { WelcomeService } from '../services/welcome.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  @Input() nickName = "";
  @Input() island = "";
  @Input() fruits = "";
  @Input() pattern = "";
  @Input() gender = "";
  allOk: boolean;
  message: string = "";
  loadOk: boolean;
  counterSubscription: Subscription;
  secondes: number;

  constructor(private welcomeService: WelcomeService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.welcomeService.isNew().then(r => {
      if (r) {
        this.router.navigate(['/cours-du-navet']);
      }
      this.loadOk = true;
      const counter$ = interval(1000);
      this.counterSubscription = counter$.subscribe(
        (value) => {
          this.secondes = value;
          if(this.secondes == 300){
            this.onDeco();
          }
        }
      )

    })
  }

  onSaveDataBase() {
    if (this.nickName.length > 15 || this.nickName == "" || this.gender == "" ||
      this.island == "" || this.fruits == "") {
      this.allOk = false;
      console.log(this.gender);
      this.message = "oups incorrect";
      console.log("oups trop long");
    } else {
      this.allOk = true;
      this.message = "Ton nouveau surnom sera : " + this.nickName;
      this.island = this.island.toUpperCase();
      this.fruits = this.fruits.toUpperCase();
      this.welcomeService.creatDataBase(this.nickName, this.island, this.fruits, this.gender).then(
        () => {
          setTimeout(
            () => {
              this.router.navigate(['/settings']);
              location.reload();
            }, 2000
          )

        }
      );
    }
  }

  onDeco(){
    this.counterSubscription.unsubscribe();
    this.secondes = 0;
    this.authService.signOutUser();

  }
}
