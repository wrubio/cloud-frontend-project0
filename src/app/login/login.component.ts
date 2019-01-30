import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/services.index';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  remember = false;
  email: string;

  constructor(public router: Router, public _userService: UserService) { }

  ngOnInit() {
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.remember = true;
    }
  }

  login ( forma: NgForm ) {
    if (forma.invalid) { return; }

    const user = new User(null, forma.value.email, forma.value.password);

    this._userService.loginUser(user, this.remember).subscribe( resp => this.router.navigate(['dashboard']));

  }
}
