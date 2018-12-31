import { Component, OnInit } from '@angular/core';
import {AppServiceService} from '../Services/app-service.service';
import {Todo} from '../Classes/Todo';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as actions from '../root-store/Actions';
import * as reducer from '../root-store/Reducer';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.css']
})
export class AddtodoComponent implements OnInit {
  todoName: string;
  todoDescription: string;
  user$: Observable<any>;
  uid: string;
  constructor(private store: Store<any>) {
    this.todoName = '';
    this.todoDescription = '';
  }

  ngOnInit() {
    this.user$ = this.store.select(reducer.getTodoState);
    // Getting the User
    this.store.dispatch(new actions.GETUSER());
    // Subscribing to the User
    this.user$.subscribe((val) => {
      // Try catch is there is no user. We dont want an error in the console
      try {
        if (val.user.uid !== null || val.user !== undefined) {
          // Setting uid if there is a user
          this.uid = val.user.uid;
        }
      } catch (e) {
        // If there is no user
      }
    });
  }

  submitTodo() {
    let todo: Todo = {
      id : '0',
      descriptionOfTodo: this.todoDescription,
      todoName: this.todoName,
      isCompleted: false,
      responsible: '',
      uid: this.uid
    }
    // Dispatching an add todo action
    this.store.dispatch(new actions.ADDTODO(todo));
  }

}
