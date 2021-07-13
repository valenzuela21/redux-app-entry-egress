import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {Subscription} from "rxjs";
import {filter, pluck, tap} from "rxjs/operators";
import {EntryExitService} from "../../services/entry-exit.service";
import Swal from "sweetalert2";
import {EntryExit} from "../../models/entry-exit.model";
import {AppStateWithEntry} from "../entry-exit.reducer";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: [
  ]
})

export class DetailsComponent implements OnInit, OnDestroy {

  entryExit:EntryExit[]= [];
  entrySub!:Subscription

  constructor(private store: Store<AppStateWithEntry>,
              private entryExitService: EntryExitService) {}

  ngOnInit(): void {
    this.entrySub = this.store.select('entryExit')
      .pipe(
        pluck('items'),
        filter(item => Object.keys(item).length > 0))
      .subscribe((items) => this.entryExit = items)
  }

  ngOnDestroy() {
    this.entrySub.unsubscribe();
  }

  eraseList(id:any){
    this.entryExitService.eraseEntryExit(id).then(r => {
      Swal.fire('Delete','¡success fully item!','success')
    }).catch(error =>{
      Swal.fire('Error Delete',error.message,'error')
    });
  }

}
