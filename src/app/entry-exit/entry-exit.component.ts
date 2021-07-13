import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
//Ngrx Store
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
//Actions Loading
import * as ui from "../shared/ui.actions";

import {EntryExit} from "../models/entry-exit.model";
import {EntryExitService} from "../services/entry-exit.service";
import Swal from 'sweetalert2';
import {Subscription} from "rxjs";



@Component({
  selector: 'app-entry-exit',
  templateUrl: './entry-exit.component.html',
  styles: [
  ]
})
export class EntryExitComponent implements OnInit, OnDestroy {

  entryForm!: FormGroup;
  type: string = 'entry';
  loading: Boolean = false;
  loadingSubs!: Subscription

  constructor(private fb: FormBuilder,
              private entryExitService: EntryExitService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.entryForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.minLength(4)]],
    })
    this.loadingSubs = this.store.select('ui').subscribe(({isLoading}) =>  this.loading = isLoading)
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  //SAVE REGISTER FORM
  saveForm(){
    if(this.entryForm.invalid){ return; }
    this.store.dispatch(ui.isLoading())
    const {description, amount} = this.entryForm.value;
    const register = new EntryExit(description, amount, this.type)
    this.entryExitService.createEntryExit(register)
      .then(()=> {
        this.store.dispatch(ui.stopLoading())
        Swal.fire('Register Succces Fully', description, 'success')
      })
      .catch(error=>{
        this.store.dispatch(ui.stopLoading())
        Swal.fire('Error', error.message, 'error')
      })

  }

}
