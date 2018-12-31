import { Component, OnInit } from '@angular/core';
import {Observable} from '../../../node_modules/rxjs/Observable';
import {Store} from '@ngrx/store';
import {Root} from '../root-store/root-state';
import * as reducer from '../root-store/Reducer';
import * as actions from '../root-store/Actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user$: Observable<any>;
  authButton: string;

  constructor(private store: Store<Root>, public router: Router) {
    this.authButton = '';
  }

  ngOnInit() {
    this.user$ = this.store.select(reducer.getTodoState);
    this.store.dispatch(new actions.GETUSER());
    this.user$.subscribe((val) => {
      console.log(val);
      try {
        if (val.user.uid === null || val.user === undefined) {
          this.authButton = 'SIGNIN';
        } else {
          this.authButton = 'SIGNOUT';
        }
      } catch (e) {
        // An exeception for when there is no user
      }
    });
  }

  authStateAction() {
    if (this.authButton === 'SIGNOUT') {
      this.store.dispatch(new actions.LOGOUT());
      this.authButton = 'SIGNIN'
      this.router.navigateByUrl('/');
    } else {
      this.router.navigateByUrl('/');
    }
  }

}
