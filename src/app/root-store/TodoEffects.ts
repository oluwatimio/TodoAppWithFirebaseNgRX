import {Injectable} from '@angular/core';
import {Effect} from '@ngrx/effects';
import {Actions, ofType} from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import * as ActionsTypes from './Actions';
import {AngularFirestore} from '@angular/fire/firestore';
import {AppServiceService} from '../Services/app-service.service';
import {Action} from '@ngrx/store';
import {switchMap, mergeMap, map} from 'rxjs/operators';
import {Todo} from '../Classes/Todo';
import 'rxjs/add/observable/fromPromise';
import {from, of} from 'rxjs';
import {AuthService} from '../Services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {User} from '../Classes/User';

export type act = ActionsTypes.All;

@Injectable()
export class TodoEffects {
  router: Router;
  constructor(private actions$: Actions, private apps: AppServiceService, private afs: AngularFirestore,
              private authService: AuthService, public snackBar: MatSnackBar, router: Router) {
    this.router = router;
  }
  // Adding todo effect
  @Effect()
  addTodo$: Observable<Action> = this.actions$.pipe(
    ofType(ActionsTypes.AddTodo),
    map((action: ActionsTypes.ADDTODO) => action),
    switchMap(data => {
      // We utitlize service to add todo. Pass the payload
      return this.apps.addTodos(data.payload).then((doc) => {
        data.payload.id = doc.id;
        this.router.navigateByUrl('tasks');
        return from(this.afs.doc<Todo>('todos/' + doc.id).update(data.payload));
      });
    }),

    map(() => new ActionsTypes.Success())
  )
  // Update todo effect
  @Effect()
  updateTodo$: Observable<Action> = this.actions$.pipe(
    ofType(ActionsTypes.UpdateTodo),
    map((action: ActionsTypes.UPDATE) => action ),
    switchMap(data => {
      // Update the todo by using the ID.
      const ref = this.afs.doc<Todo>(`todos/${data.id}`)
      return from(ref.update(data.changes));
  }),
    map(() => new ActionsTypes.Success())
  );
  // Signin effect
  @Effect()
  Signin: Observable<Action> = this.actions$.pipe(
    ofType(ActionsTypes.SignIn),
    map((action: ActionsTypes.SIGNIN) => action.payload),
    switchMap(credentials => {
      // We utitlize service to get sign in. Pass the paylaod
      return this.authService.signIn({email: credentials.email, pass: credentials.pass})
        .then(() => {
          this.snackBar.open('Welcome Back', null, {duration: 5000});
          this.router.navigateByUrl('tasks');
          return {type: ActionsTypes.LoginSuccess};
        });
    })
  );

  // Sign up effect
  @Effect()
  Signup: Observable<Action> = this.actions$.pipe(
    ofType(ActionsTypes.SignUp),
    map((action: ActionsTypes.SIGNUP) => action.payload),
    switchMap(credential => {
      return this.authService
        .signUp({email: credential.email, pass: credential.pass})
        .then(() => {
          this.snackBar.open('Sign up successful', null, {duration: 5000});
          this.router.navigateByUrl('tasks');
          return {type: ActionsTypes.LoginSuccess};
        });
    })
  );
  // Get user effect
  @Effect()
  getUser: Observable<Action> = this.actions$.pipe(
    ofType(ActionsTypes.GetUser),
    map((action: ActionsTypes.GETUSER) => action.payload),
    switchMap(payload => this.authService.getUser()),
    map(authData => {
      if (authData) {
        const user = new User(authData.uid);
        return new ActionsTypes.AUTHENTICATED(user);
      } else {
        const user = new User(null);
        return new ActionsTypes.NOTAUTHENTICATED(user);
      }
    })
  );
  // Logout effect
  @Effect()
  logout: Observable<Action> = this.actions$.pipe(
    ofType(ActionsTypes.Logout),
    map((action: ActionsTypes.LOGOUT) => action.payload),
    switchMap(payload => {
      // We utilize service to logout
      return of(this.authService.Logout());
    }),
    map(authData => {
      return new ActionsTypes.NOTAUTHENTICATED();
    })
  );
}
