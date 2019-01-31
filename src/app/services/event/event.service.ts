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

  createEvent (event: Event, token: string) {
    const url = URL_SERVICES + '/event?token=' + token;
    return this.http.post(url, event)
      .pipe(map( (resp: any) => {
        swal('Evento: ', event.name + ' Fue crado!', '');
        return resp;
      }));
  }

  editEvent (event: Event, token: string) {
    const url = URL_SERVICES + '/event/' + event._id + '?token=' + token;
    return this.http.put(url, event)
      .pipe(map( (resp: any) => {
        swal('Evento: ', event.name + ' fue actualizado!', '');
        return resp;
      }));
  }

  deleteEvent (event: Event, token: string) {
    const url = URL_SERVICES + '/event/' + event._id + '?token=' + token;
    return this.http.delete(url)
    .pipe(map( (resp: any) => {
      swal('Evento: ', event.name + ' Fue eliminado!', '');
      return resp;
    }));
  }

}
