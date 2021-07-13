import { Action, createReducer, on} from '@ngrx/store';
import {setUser, unSetUser} from './auth.actions';
import {User} from "../models/user.model";

export interface State {
  user: User | object
}

export const initialState: State = {
  user: {}
};

const _userReducer = createReducer(
  initialState,
  on(setUser, (state, {user}) =>({...state, user: {...user}})),
  on(unSetUser, (state) =>({...state, user: {}}))
);

export function userReducer(state: State | undefined, action: Action) {
  return _userReducer(state, action);
}
