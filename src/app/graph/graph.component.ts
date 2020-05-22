import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  @Input() user;
  me: User;
  sundayList: String[];
  userSubscription: Subscription;
  loadOk: boolean;
  options: any = {
    Chart: {
      type: 'arearange',
      height: 700
    },
    title: {
      text: 'Cours du Navet'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: ['Lundi Matin', 'Lundi Aprem', 'Mardi Matin', 'Mardi Aprem', 'Mercredi Matin', 'Mercredi Aprem', 'Jeudi Matin',
        'Jeudi Aprem', 'Vendredi Matin', 'Vendredi Aprem', 'Samedi Matin', 'Samedi Aprem'],
      tickmarkPlacement: 'on',
      title: {
        enabled: false
      }
    },
    plotOptions: {
      area: {
        stacking: 'normal',
        lineColor: '#666666',
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: '#666666'
        }
      }
    },
    series: [{
      name: 'Prix du jour',
      data: [''],
      color: 'red',
    },
    {
      name: 'Prix d achat',
      data: [''],
      color: 'red',
      marker: false
    },
    {
      name: 'Mes datas',
      data: ['']
    },
    {
      name: 'Mon dimanche',
      data: [''],
      marker: false,
      color: 'blue',
    }]
  }
  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userSubscription = this.userService.userSubject.subscribe(
      (user: User) => {

        this.options.series[0].data = this.user.data;
        let sunday = parseInt(this.user.sunday);
        let sundayList = [sunday, sunday, sunday, sunday, sunday, sunday,
          sunday, sunday, sunday, sunday, sunday, sunday]
        this.options.series[1].data = sundayList;

        this.me = user;
        let sundayList2 = [this.me.sunday, this.me.sunday, this.me.sunday,
          this.me.sunday, this.me.sunday, this.me.sunday, this.me.sunday,
          this.me.sunday, this.me.sunday, this.me.sunday, this.me.sunday, this.me.sunday]

        this.options.series[2].data = this.me.data;
        this.options.series[3].data = sundayList2;

        this.loadOk = true;
        Highcharts.chart('container2', this.options);
      });
    this.userService.emitMe();

  }
}
