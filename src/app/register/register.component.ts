import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { format } from 'util';

import swal from 'sweetalert';
import { UserService } from '../services/services.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  constructor(public _userService: UserService, public router: Router) { }

  samePassword (pass1: string, pass2: string) {
    return  (group: FormGroup) => {
      const value1 = group.controls[pass1].value;
      const value2 = group.controls[pass2].value;

      if (value1 === value2)  {return null; }

      return {same: true};
    };
  }

  ngOnInit() {
    this.forma = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      rPassword: new FormControl(null, Validators.required),
      conditions: new FormControl(false)
    }, {validators: this.samePassword('password', 'rPassword')});
  }

  userRegister () {
    if (!this.forma.valid) {
      return;
    }

    if (!this.forma.value.conditions) {
      swal('Importante!', 'Debe aceptar los terminos y condiciones', 'warning');
      return;
    }

    const user = new User(
      this.forma.value.name,
      this.forma.value.email,
      this.forma.value.password
    );

    this._userService.createUser(user).subscribe( res => this.router.navigate(['/login']));
  }
}
