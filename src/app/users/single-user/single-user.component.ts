import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { WelcomeService } from 'src/app/services/welcome.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['../../view/view.component.css']
})
export class SingleUserComponent implements OnInit {

  constructor(private usersService: UsersService,
    private route: ActivatedRoute,
    private welcomeService: WelcomeService,
    private router: Router) {}

user: User;
loadOk:boolean;
datas: number[];

ngOnInit() {
  this.welcomeService.isNew().then(
    (r) => {
      if (!r) {
        this.router.navigate(['welcome']);

      } else {
    const id = this.route.snapshot.params['id'];
    this.usersService.getSingleUser(id).then(
      (user: User) => {
        this.user = user;
        this.datas = this.user.data;
        this.loadOk = true;
      }
    );
      }
    });
}

onBack() {
  this.router.navigate(['/users']);
}


}
