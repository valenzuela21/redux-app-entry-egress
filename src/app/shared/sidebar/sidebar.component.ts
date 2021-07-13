import {AfterContentChecked, AfterContentInit, Component, OnChanges, OnInit} from '@angular/core';
//NgRx Redux
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";

import {Router} from "@angular/router";

import {AuthService} from "../../services/auth.service";
import {filter, pluck} from "rxjs/operators";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit{

  infoUser!: User;

  constructor(private auth: AuthService,
              private store: Store<AppState>,
              private router: Router) { }

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

  logOut(){
    this.auth.logOut().then(()=>{
      this.router.navigate(['/login'])
    });
  }
}
