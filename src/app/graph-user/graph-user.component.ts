import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-graph-user',
  templateUrl: './graph-user.component.html',
  styleUrls: ['./graph-user.component.css']
})
export class GraphUserComponent implements OnInit {

  constructor(private userService: UsersService,
    private authService: AuthService) { }
  public options: any = {
    Chart: {
      type: 'area',
      height: 700
    },
    title: {
      text: 'Cours du Navet'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: ['Lundi M', 'Lundi A', 'Mardi M', 'Mardi A', 'Mercredi M', 'Mercredi A', 'Jeudi M',
        'Jeudi A', 'Vendredi M', 'Vendredi A', 'Samedi M', 'Samedi A'],
      tickmarkPlacement: 'on',
      title: {
        enabled: false
      }
    },
    series: [
      {
        name: 'Prix du jour',
        data: []
      }, {
        name: 'Prix dachat',
        data: [],
        marker: false
      }]
  }

  dataSubscription: Subscription;
  user: User;
  userName: string;
  chartE;
  sundayList;

  ngOnInit() {
    this.userName = this.authService.getUserUid()
    this.userService.getMyUser().then(
      (user: User) => {
        this.user = user;
        this.sundayList = [this.user.sunday, this.user.sunday, this.user.sunday,
        this.user.sunday, this.user.sunday, this.user.sunday, this.user.sunday,
        this.user.sunday, this.user.sunday, this.user.sunday, this.user.sunday, this.user.sunday]

        this.options.series[0].data = this.user.data;
        this.options.series[1].data = this.sundayList;
        this.chartE = Highcharts.chart("container", this.options);
        this.dataSubscription = this.userService.userSubject.subscribe(
          (user: User) => {
            this.user = user;
            this.options.series[0].data = this.user.data;

            this.sundayList = [this.user.sunday, this.user.sunday, this.user.sunday,
              this.user.sunday, this.user.sunday, this.user.sunday, this.user.sunday,
              this.user.sunday, this.user.sunday, this.user.sunday, this.user.sunday, this.user.sunday]

            this.options.series[1].data = this.sundayList;
            this.chartE.series[0].setData(this.options.series[0].data);
            this.chartE.series[1].setData(this.options.series[1].data);
          });

      }
    );


  }

}
