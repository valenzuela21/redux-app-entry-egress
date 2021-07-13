import {Action, createReducer, on} from '@ngrx/store';
import { setItems, unsetItems } from './entry-exit.actions';
import {EntryExit} from "../models/entry-exit.model";
import {AppState} from "../app.reducer";

export interface State {
  items: EntryExit[]
}

//Redux Lazy Load in the file entry-exit.model
export interface AppStateWithEntry extends  AppState{
  entryExit: State
}

export const initialState: State = {
  items:[],
};

const _entry_exitReducer = createReducer(
  initialState,
  on(setItems, (state, {items}) => ({...state, items: [...items]})),
  on(unsetItems, (state) => ({...state, items: []})),
);

export function entryExitReducer(state: State | undefined, action: Action) {
  return _entry_exitReducer(state, action);
}
