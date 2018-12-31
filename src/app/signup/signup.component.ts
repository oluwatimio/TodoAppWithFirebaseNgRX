import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as actions from '../root-store/Actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userPass: string;
  userEmail: string;
  constructor(private store: Store<any>) {
    this.userPass = '';
    this.userEmail = '';
  }

  ngOnInit() {
  }

  register() {
    // Dispatch sign up action
    this.store.dispatch(new actions.SIGNUP({email: this.userEmail, pass: this.userPass}));
  }

}
