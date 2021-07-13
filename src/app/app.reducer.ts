import {ActionReducerMap} from "@ngrx/store";
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reduce';
import * as entryExit from './entry-exit/entry-exit.reducer'

export interface AppState{
  ui: ui.State,
  user: auth.State,
  //entryExit: entryExit.State
}

export const appReducer: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.userReducer,
  //entryExit: entryExit.entryExitReducer
}
