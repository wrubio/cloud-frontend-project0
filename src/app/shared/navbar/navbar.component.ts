import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/services.index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor(public _userService: UserService) { }

  ngOnInit() {
  }

}
