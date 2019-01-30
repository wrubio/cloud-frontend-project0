import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User} from '../../models/user.model';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) {
    console.log('servicio listo para usar');
  }

  createUser (user: User) {
    const url = URL_SERVICES + '/user';
    return this.http.post(url, user)
      .pipe(map( (resp: any) => {
        swal('Usuario: ', user.email + ' Fue crado!', 'succsess');
        return resp.user;
      }));
  }

  loginUser (user: User, remember: boolean = false) {
    const url = URL_SERVICES + '/login';
    console.log(remember);
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

        return true;
      }));
  }
}
