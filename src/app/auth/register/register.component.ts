import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
//NgRx
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import * as ui from "../../shared/ui.actions";

import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Subscription} from "rxjs";
import loader from "@angular-devkit/build-angular/src/webpack/plugins/single-test-transform";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  myReactiveForm!: FormGroup;
  loading!: Boolean;
  subscription!: Subscription;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private store: Store<AppState>,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.myReactiveForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
    this.subscription = this.store.select('ui')
      .subscribe(ui => this.loading = ui.isLoading)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createUser() {
    if(this.myReactiveForm.invalid){ return; }

    /*Swal.fire({
      title: 'Espera Por Favor',
      didOpen: () => {
        Swal.showLoading()
      },
    })*/
    this.store.dispatch(ui.isLoading());

    const {username, email, password} = this.myReactiveForm.value;
    this.auth.createUser(username, email, password).then(
      ()=> {
        //Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      }
    ).catch(error => {
      this.store.dispatch(ui.stopLoading());
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
      })
    });
  }

  get username() {
    return this.myReactiveForm.get("username");
  }

  get email() {
    return this.myReactiveForm.get("email");
  }

  get password() {
    return this.myReactiveForm.get("password");
  }



}
