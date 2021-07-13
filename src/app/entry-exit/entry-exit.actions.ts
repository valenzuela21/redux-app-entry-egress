import { createAction, props } from '@ngrx/store';
import {EntryExit} from "../models/entry-exit.model";

export const setItems = createAction(
  '[EntryExit] setItems',
        props<{items: EntryExit[]}>()
);
export const unsetItems = createAction('[EntryExit] UnsetItems');
