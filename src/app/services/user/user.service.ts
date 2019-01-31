import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User} from '../../models/user.model';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string;

  constructor(public http: HttpClient, public router: Router) {
    this.loadStorage();
  }

  createUser (user: User) {
    const url = URL_SERVICES + '/user';
    return this.http.post(url, user)
      .pipe(map( (resp: any) => {
        swal('Usuario: ', user.email + ' Fue crado!', '');
        return resp.user;
      }));
  }

  loginUser (user: User, remember: boolean = false) {
    const url = URL_SERVICES + '/login';
    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(url, user)
      .pipe(map( (resp: any) => {
        localStorage.setItem('id', JSON.stringify(resp.user._id));
        localStorage.setItem('token', JSON.stringify(resp.token));
        localStorage.setItem('user', JSON.stringify(resp.user));

        this.token = resp.token;
        return true;
      }));
  }

  logout() {
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }

  isLogin() {
    return this.token.length > 5 ? true : false;
  }

  loadStorage () {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }
}
