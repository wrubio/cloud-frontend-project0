import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/services.index';
// import { userInfo } from 'os';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  user: any;
  token: string;
  userEvents = [];

  constructor(public _eventService: EventService) {
    this.getUserData();
    this._eventService.getEvents().subscribe( (res: any) => {
      const uID = this.user._id;
      const events = res.event;
      events.map( (event: any ) => {
        if (event.user._id === uID) {
          this.userEvents.push(event);
        }
      });
      console.log(res.event);
    });
  }

  ngOnInit() {
    console.log(this.userEvents);
  }

  getUserData () {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.token = localStorage.getItem('token');
    console.log(this.user);
    console.log(this.token);
  }

}
