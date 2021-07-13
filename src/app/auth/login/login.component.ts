import {Component, OnInit, OnDestroy} from '@angular/core';
import Swal from 'sweetalert2';
//Ngrx Store
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import * as ui from '../../shared/ui.actions'

import {Subscription} from "rxjs";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  loading!: Boolean;
  uiSubscription!: Subscription;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private store: Store<AppState>,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      }
    )
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    })
  }

  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());

    const {email, password} = this.loginForm.value;
    this.auth.loginUser(email, password).then(
      () =>{
        this.store.dispatch(ui.stopLoading())
        this.router.navigate(['/'])
      }
    ).catch((error) => {
      this.store.dispatch(ui.stopLoading())
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
      })
    });
  }

}
