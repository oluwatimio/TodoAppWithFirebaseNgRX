import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as actions from '../root-store/Actions';
import * as reducer from '../root-store/Reducer';
import {Todo} from '../Classes/Todo';
import {selectFirstAll} from '../root-store/Reducer';
import {AppServiceService} from '../Services/app-service.service';
import {Root} from '../root-store/root-state';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

export interface AppState {
  user: any;
}

@Component({
  selector: 'app-tasks-component',
  templateUrl: './tasks-component.component.html',
  styleUrls: ['./tasks-component.component.css']
})
export class TasksComponentComponent implements OnInit {
  todos: Observable<Todo[]>;
  user$: Observable<any>;
  uid: string;
  constructor(private store: Store<Root>, private abs: AppServiceService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user$ = this.store.select(reducer.getTodoState);
    // Getting the user
    this.store.dispatch(new actions.GETUSER());
    // Subscribing to the user
    this.user$.subscribe((val) => {
      console.log(val);
      // Try catch is there is no user. We dont want an error in the console
      try {
        if (val.user.uid === null || val.user === undefined) {
          // No user, we open a snackbar message
          this.snackBar.open('You must be signed in to see todos please sign in', null, {duration: 5000});
        } else {
          // If there is a user, we dismiss message immediately. This takes into consideration delay from firebase auth
          this.snackBar.dismiss()
          this.uid = val.user.uid;
          // We get todo's if there is a user. Firbase wont allow us read or write if theres no user anyways
          this.todos = this.abs.getTodos();
        }
      } catch (e) {

      }
    });

  }

  toggle(a, b) {
    console.log(b.option.value);
    let todo: Todo = b.option.value;
    todo.isCompleted = true;
    // Update todo info. toggle true for complete todo
    // Dispatch
    this.store.dispatch(new actions.UPDATE(todo.id, todo));
  }

  toggleComplete(a, b) {
    let todo: Todo = b.option.value;
    todo.isCompleted = false;
    // Dispatch update action. Toggle false for todo incomplete
    this.store.dispatch(new actions.UPDATE(todo.id, todo));
  }

}
