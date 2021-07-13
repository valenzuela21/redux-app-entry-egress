import { NgModule } from '@angular/core';
import {RegisterComponent} from "./register/register.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AuthModule { }
