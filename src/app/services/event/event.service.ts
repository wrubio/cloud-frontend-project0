import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { Event } from '../../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(public http: HttpClient, public router: Router) {}

  getEvents () {
    const url = URL_SERVICES + '/event';
    return this.http.get(url);
  }

}
