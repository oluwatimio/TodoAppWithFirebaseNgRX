import { Component, OnInit } from '@angular/core';
import * as actions from '../root-store/Actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  userPass: string;
  userEmail: string;
  constructor(private store: Store<any>) {
    this.userPass = '';
    this.userEmail = '';
  }

  ngOnInit() {
  }

  login() {
    // Dispatch Signin action
    this.store.dispatch(new actions.SIGNIN({email: this.userEmail, pass: this.userPass}));
  }

}
