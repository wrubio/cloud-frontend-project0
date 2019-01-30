import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  constructor() { }

  ngOnInit() {
    this.forma = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      rPassword: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    });
  }

}
