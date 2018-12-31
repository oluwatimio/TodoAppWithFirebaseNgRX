import {Todo} from '../Classes/Todo';
import {Subject} from 'rxjs';
import {User} from '../Classes/User';

export interface RootState {
  readonly init: Root;
}

export interface Root {
  todos: Todo[];
  user: User;
}
