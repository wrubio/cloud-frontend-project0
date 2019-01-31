import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { EventService } from '../../services/services.index';
import { NgForm } from '@angular/forms';
import { Event } from '../../models/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewChecked   {

  user: any;
  token: string;
  userEvents = [];
  create = true;
  getUser: any;
  viewDet = false;
  ready = false;;

  constructor(public _eventService: EventService, public router: Router) {
    this.getUserData();
    this.getUser = this._eventService.getEvents().subscribe( (res: any) => {
      const uID = this.user._id;
      const events = res.event;
      events.map( (event: any ) => {
        if (event.user._id === uID) {
          this.userEvents.push(event);
        }
      });
    });
  }

  ngOnInit() {}
  // ===============================================================================
  // Obtiene los datos del usuario almacenados en el local storage
  getUserData () {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.token = localStorage.getItem('token');
  }
  // ===============================================================================
  // Crea nuevos eventos
  createEvent ( forma: NgForm ) {
    if (forma.invalid) { return; }
    const userToken = this.token.replace(/['"]+/g, '');
    const event = new Event(forma.value.name, forma.value.description, forma.value.startDate, forma.value.endDate);
    this._eventService.createEvent(event, userToken).subscribe( res => this.reloadPage() );
  }
  // ===============================================================================
  // Edita un evento
  editEvent(formed: NgForm) {
    if (formed.invalid) { return; }
    const userToken = this.token.replace(/['"]+/g, '');
    const event = new Event(formed.value.name, formed.value.description, formed.value.startDate, formed.value.endDate, formed.value._id);
    console.log(formed.value);
    this._eventService.editEvent(event, userToken).subscribe( res => this.reloadPage() );
  }
  // ===============================================================================
  // Elimina un event0
  deleteEvent (forme: NgForm ) {
    if (forme.invalid) { return; }
    const userToken = this.token.replace(/['"]+/g, '');
    const event = new Event(forme.value.name, forme.value.description, forme.value.startDate, forme.value.endDate, forme.value._id);
    this._eventService.deleteEvent(event, userToken).subscribe( res => this.reloadPage() );
  }
  // ===============================================================================
  // Habilita los inputs a editar
  disabledInputs (e) {
    const id = e.target.dataset.id;
    const inputs = Array.prototype.slice.apply(document.querySelectorAll('.' + id));
    inputs.map( input => {
      if (input.classList.contains('event-input')) {
        input.disabled = false;
      }
      if (input.getAttribute('type') === 'text') {
        if (input.getAttribute('name') === 'endDate' || input.getAttribute('name') === 'startDate') {
          const inputValue = input.value;
          const formatInputValue = inputValue.replace(/['/]+/g, '-');
          const date = new Date(formatInputValue);
          input.setAttribute('type', 'date');
          input.value = date.toISOString().slice(0, 10);
        }
      }
      if (input.getAttribute('type') === 'submit') {
        const buttonValue = input.innerHTML;
        if (buttonValue === 'Editar' || buttonValue === 'Borrar' || buttonValue === 'Ver Detalles' || buttonValue === 'Ocultar Detalles') {
          input.style.display = 'none';
        } else {
          input.classList.remove('d-none');
        }
      }
      if (input.dataset.type === 'container') {
        input.classList.add('expand-card-body');
      }
    });
  }
  // ===============================================================================
  // Cancelar editar evento
  cancel(e) {
    const id = e.target.dataset.id;
    const inputs = Array.prototype.slice.apply(document.querySelectorAll('.' + id));
    inputs.map( input => {
      if (input.classList.contains('event-input')) {
        input.disabled = true;
      }
      if (input.getAttribute('type') === 'submit') {
        const buttonValue = input.innerHTML;
        if (buttonValue === 'Editar' || buttonValue === 'Borrar' || buttonValue === 'Ver Detalles' || buttonValue === 'Ocultar Detalles') {
          input.style.display = 'block';
          if (buttonValue === 'Ocultar Detalles') {
            input.innerHTML = 'Ver Detalles';
            this.viewDet = !this.viewDet;
          }
        } else {
          input.classList.add('d-none');
        }
      }
      if (input.dataset.type === 'container') {
        input.classList.remove('expand-card-body');
      }
    });
  }
  // ===============================================================================
  // Muestra los detalles de los eventos
  viewDetail(e) {
    const id = e.target.dataset.id;
    const inputs = Array.prototype.slice.apply(document.querySelectorAll('.' + id));
    inputs.map( input => {
      if (input.getAttribute('type') === 'submit') {
        const buttonValue = input.innerHTML;
        if (buttonValue === 'Ver Detalles' || buttonValue === 'Ocultar Detalles') {
          this.viewDet === false  ? input.innerHTML = 'Ocultar Detalles' : input.innerHTML = 'Ver Detalles';
        }
      }
      if (input.dataset.type === 'container') {
        this.viewDet === false  ? input.classList.add('expand-card-body') : input.classList.remove('expand-card-body');
      }
    });
    this.viewDet = !this.viewDet;
  }
  // ===============================================================================
  // Recarga nuevamente el componente
  reloadPage() {
    this.router.navigateByUrl('home', {skipLocationChange: true}).then( () => this.router.navigate(['dashboard']));
  }
  // ===============================================================================
  // Desabilita los inputs de los eventos creados por el usuario
  ngAfterViewChecked () {
    if (!this.ready) {
      const allInputs = Array.prototype.slice.apply(document.querySelectorAll('.event-input'));
      allInputs.map( input => {
        input.disabled = true;
        this.ready = true;
        console.log('ENTRO!!!!');
      });
    }
  }
  // ===============================================================================
  // Desinscribirse de los servicios y promesas
  ngOnDestroy() {
    this.getUser.unsubscribe();
  }
}
