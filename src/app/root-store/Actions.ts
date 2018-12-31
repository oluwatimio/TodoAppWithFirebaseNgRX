import {Action} from '@ngrx/store';
import {Todo} from '../Classes/Todo';

// export enum ActionEnum {
//   UpdateTodo = '[Todo] UpdateTodo',
//   ModifiedTodo = '[Todo] Modified',
//   // Update = '[Todo] UPDATE',
//   SuccessTodo = '[Todo] SUCCESS'
//
// }

export const AddTodo = '[Todo] modified';
export const UpdateTodo   = '[Todo] UpdateTodo';
export const SuccessTodo  = '[Todo] update success';
export const SignUp = 'Registering';
export const SignIn = 'LoggedIn';
export const LoginSuccess = 'Login Successful';
export const GetUser = 'GetUser';
export const Authenticated = 'Authenticated';
export const NotAuthenticated = 'NotAuthenticated';
export const Logout = 'Logout';

export class UPDATE implements Action {
  readonly type = UpdateTodo;
  constructor(public id: string, public changes: Partial<Todo>, public payload?: any) { }
}

export class ADDTODO implements Action {
  readonly type = AddTodo;
  constructor(public payload: Todo, public changes?: any, public id?: any) {}
}

export class SIGNUP implements Action {
  readonly type = SignUp;

  constructor(public payload: { email: string, pass: string }, public changes?: any, public id?: any) {}
}

export class SIGNIN implements Action {
  readonly type = SignIn;
  constructor(public payload: {email: string, pass: string}, public changes?: any, public id?: any) {}
}

export class LOGINSUCCESS implements Action {
  readonly type = LoginSuccess;
  constructor(payload: any = null, public changes?: any, public id?: any) {}
}

export class Success implements Action {
  readonly type = SuccessTodo;
  constructor(payload: any = null, public changes?: any, public id?: any) {}
}

export class GETUSER implements Action {
  readonly type = GetUser;
  constructor(public payload?: any, public changes?: any, public id?: any) {}
}

export class AUTHENTICATED implements Action {
  readonly type = Authenticated;
  constructor(public payload?: any, public changes?: any, public id?: any) {}
}

export class NOTAUTHENTICATED implements Action {
  readonly type = NotAuthenticated;
  constructor(public payload?: any, public changes?: any, public id?: any) {}
}

export class LOGOUT implements Action {
  readonly type = Logout;
  constructor(public payload?: any, public changes?: any, public id?: any) {}
}

export type All = UPDATE | AUTHENTICATED | GETUSER | NOTAUTHENTICATED | LOGOUT;
