import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {filter, pluck} from "rxjs/operators";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  infoUser!: User;

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('user')
      .pipe(
        pluck('user'),
        filter(item => Object.values(item).length > 0)
      )
      .subscribe((user:any) => {
        let info = new User(user.uid,user.name,user.email);
        this.infoUser = info;
      })
  }



}
