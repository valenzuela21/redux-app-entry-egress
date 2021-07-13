import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from "../app.reducer";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";
import {EntryExitService} from "../services/entry-exit.service";
import * as items from "../entry-exit/entry-exit.actions";
import {EntryExit} from "../models/entry-exit.model";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>,
              private entryExit: EntryExitService) { }

  userSubscription!:Subscription;
  memberSubscription!:Subscription;

  ngOnInit(): void {
    this.userSubscription = this.store.select('user')
      .pipe(filter(({user}) => Object.values(user).length > 0))
      .subscribe(({user})=>{
        // @ts-ignore
        this.memberSubscription = this.entryExit.initEntryExit(user)
          .subscribe((data: {uid: string, data: any}[]) => {
            // @ts-ignore
            this.store.dispatch(items.setItems({items: data}))
          }
          );

      })
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
    this.memberSubscription?.unsubscribe();
  }

}
