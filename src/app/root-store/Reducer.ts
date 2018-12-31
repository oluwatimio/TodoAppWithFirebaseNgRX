import {Todo} from '../Classes/Todo';
import {Root, RootState} from './root-state';
import * as ActionsTypes from './Actions';
import {Action} from '@ngrx/store';
import {EntityState, createEntityAdapter} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';
import {User} from '../Classes/User';

export type ActionTypeIn = ActionsTypes.All;

export const INITIAL_STATE: Root = {
  todos: [],
  user: new User(null)
};

export const todoAdapter = createEntityAdapter<Todo>();
export interface State extends EntityState<Todo> { }
export const initialState: State = todoAdapter.getInitialState(INITIAL_STATE);

export function Reducer(state = initialState, action: ActionTypeIn) {
  switch (action.type) {
    case ActionsTypes.UpdateTodo: {
      return todoAdapter.updateOne({id: action.id, changes: action.changes}, state);
    }
    case ActionsTypes.GetUser: {
      return {...state};
    }
    case ActionsTypes.Authenticated: {
      return {...state,
        user: action.payload};
    }

    case ActionsTypes.NotAuthenticated: {
      return {...state, user: action.payload};
    }
    case ActionsTypes.Logout: {
      return {...state};
    }
    default:
      return state;
  }
}

export const getTodoState = createFeatureSelector<State>('init');

export const {
   selectIds: selectFirstIds, selectEntities: selectFirstEntities, selectAll: selectFirstAll, selectTotal: selectFirstTotal
} = todoAdapter.getSelectors(getTodoState);
